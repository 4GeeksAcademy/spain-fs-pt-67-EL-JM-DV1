"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from utils import APIException, generate_sitemap
from admin import setup_admin
from models import db, User, Product


app = Flask(__name__)
app.url_map.strict_slashes = False

db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "#"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

MIGRATE = Migrate(app, db)
db.init_app(app)
CORS(app)
setup_admin(app)

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    return generate_sitemap(app)

# USER-----------------------------------------------------------------------------------------------

#Create a User
@app.route('/user', methods=['POST'])
def create_user():
    # Process the information coming from the client
    user_data = request.get_json()

    # We create an instance without being recorded in the database
    user = User()
    user.firstName = user_data["firstName"]
    user.address= user_data["address"]
    user.email = user_data["email"]
    user.password = user_data["password"]

    if not (user.name and user.last_name and user.email):
        return jsonify({'message': 'All fields are required'}), 400

    return jsonify({'message': 'User registered successfully'}), 201


#Get all users
@app.route('/users', methods=['GET'])
def get_users():
    #access all registered users
    users_querys = User.query.all()
    #map users to convert into an array and return an array of objects
    results = list(map(lambda user: user.serialize(), users_querys))

    #is users empty, returns error code
    if results == []:
        return jsonify({"msg": "No registered users"}), 404
    
    #display results of access
    response_body = {
        "msg": "These are the registered users", 
        "results": results
    }
    return jsonify(response_body), 200

#DGet user by id
@app.route('/users/<int:user_id>', methods=['GET'])
def get_one_user(user_id):
    #filter all users by id
    user_query = User.query.filter_by(user = user_id).first()

    if user_query is None:
        return jsonify({"msg": "User with id: " + str(user_id) + " doesn't exist"}), 404
    
    response_body = {
        "msg": "User is", 
        "result": user_query.serialize()
    }

    return jsonify(response_body), 200

# Product-----------------------------------------------------------------------------------------------

#Create a User
@app.route('/product', methods=['POST'])
def create_product():
    # Process the information coming from the client
    product_data = request.get_json()

    # We create an instance without being recorded in the database
    product = Product()
    product.name = product_data["Name"]
    product.price= product_data["Price"]
    product.category = product_data["Category"]
    product.image = product_data["Image"]
    product.description = product_data["Description"]

    if not (product.name, product.price, product.category, product.image, product.description):
        return jsonify({'message': 'All fields are required'}), 400

    return jsonify({'message': 'User registered successfully'}), 201