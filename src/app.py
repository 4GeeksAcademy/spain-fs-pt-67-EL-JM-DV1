"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from api.models import db, User, Product, OrderItems, Order


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

#Create a Product
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

    return jsonify({'message': 'Product registered successfully'}), 201

#Get all Products
@app.route('/products', methods=['GET'])
def get_products():
    #access all registered users
    products_querys = Product.query.all()
    #map users to convert into an array and return an array of objects
    results = list(map(lambda products: products.serialize(), products_querys))

    #is Products empty, returns error code
    if results == []:
        return jsonify({"msg": "No registered Products"}), 404
    
    #display results of access
    response_body = {
        "msg": "These are the registered Products", 
        "results": results
    }
    return jsonify(response_body), 200

#DGet Products by id
@app.route('/products/<int:products_id>', methods=['GET'])
def get_one_product(products_id):
    #filter all Product by id
    Product_query = Product.query.filter_by(products = products_id).first()

    if Product_query is None:
        return jsonify({"msg": "Product with id: " + str(products_id) + " doesn't exist"}), 404
    
    response_body = {
        "msg": "Produt is", 
        "result": Product_query.serialize()
    }

    return jsonify(response_body), 200

    # OrderItems-----------------------------------------------------------------------------------------------

    #Create a orderitems
@app.route('/orderitems', methods=['POST'])
def create_orderitems():
    # Process the information coming from the client
    orderitems_data = request.get_json()

    # We create an instance without being recorded in the database
    orderitems = OrderItems()
    orderitems.orderid = orderitems_data["OrderID"]
    orderitems.productid = orderitems_data["ProductID"]
    orderitems.quantity = orderitems_data["Quantity"]
    
    if not (orderitems.orderid, orderitems.productid, orderitems.quantity):
        return jsonify({'message': 'All fields are required'}), 400
    return jsonify({'message': 'User registered successfully'}), 201

#Get all orderitems
@app.route('/orderitems', methods=['GET'])
def get_orderitems():
    #access all registered OrderItems
    orderitems_querys = OrderItems.query.all()
    #map users to convert into an array and return an array of objects
    results = list(map(lambda orderitems: orderitems.serialize(), orderitems_querys))

    #is OrderItems empty, returns error code
    if results == []:
        return jsonify({"msg": "No registered OrderItems"}), 404
    
    #display results of access
    response_body = {
        "msg": "These are the registered OrderItems", 
        "results": results
    }
    return jsonify(response_body), 200

#DGet OrderItems by id
@app.route('/OrderItems/<int:OrderItems_id>', methods=['GET'])
def get_one_OrderItems(orderitems_id):
    #filter all OrderItems by id
    OrderItems_query = OrderItems.query.filter_by(orderitems = orderitems_id).first()

    if OrderItems_query is None:
        return jsonify({"msg": "OrderItems with id: " + str(orderitems_id) + " doesn't exist"}), 404
    
    response_body = {
        "msg": "OrderItems is", 
        "result": OrderItems_query.serialize()
    }
    return jsonify(response_body), 200

    # Order-----------------------------------------------------------------------------------------------

    #Create a order
@app.route('/order', methods=['POST'])
def create_order():
    # Process the information coming from the client
    order_data = request.get_json()

    # We create an instance without being recorded in the database
    order = Order()
    order.UserID = order_data["UserID"]
    order.totalamount = order_data["TotalAmount"]
    order.orderstatus = order_data["OrderStatus"]
    
    if not (order.UserID, order.totalamount, order.orderstatus):
        return jsonify({'message': 'All fields are required'}), 400
    return jsonify({'message': 'Order registered successfully'}), 201

#Get all order
@app.route('/order', methods=['GET'])
def get_order():
    #access all registered OrderItems
    order_querys = Order.query.all()
    #map users to convert into an array and return an array of objects
    results = list(map(lambda order: order.serialize(), order_querys))

    #is Order empty, returns error code
    if results == []:
        return jsonify({"msg": "No registered Order"}), 404
    
    #display results of access
    response_body = {
        "msg": "These are the registered Order", 
        "results": results    }
    return jsonify(response_body), 200

#DGet Order by id
@app.route('/Order/<int:Order_id>', methods=['GET'])
def get_one_Order(order_id):
    #filter all Order by id
    Order_query = Order.query.filter_by(order = order_id).first()

    if Order_query is None:
        return jsonify({"msg": "Order with id: " + str(order_id) + " doesn't exist"}), 404
    
    response_body = {
        "msg": "Order is", 
        "result": Order_query.serialize()
    }
    return jsonify(response_body), 200