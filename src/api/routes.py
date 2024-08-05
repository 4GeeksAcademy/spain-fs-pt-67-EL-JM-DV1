"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import stripe
from flask import Flask, request, jsonify, url_for, Blueprint, redirect
from api.models import db, User, Product, Order, OrderItems
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


# Hello/Prueba ------------------------------------------------------------------------------------

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# API-----------------------------------------------------------------------------------------------

stripe.api_key = 'sk_test_4eC39HqLyjWDarjtT1zdp7dc'

# app = Flask(__name__,
#             static_url_path='',
#             static_folder='public')

YOUR_DOMAIN = 'http://localhost:4242'

@api.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    'price': '{{PRICE_ID}}',
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=YOUR_DOMAIN + '?success=true',
            cancel_url=YOUR_DOMAIN + '?canceled=true',
        )
    except Exception as e:
        return str(e)

    return redirect(checkout_session.url, code=303)

# Login----------------------------------------------------------------------------------------------

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    # Aquí deberías validar contra tu base de datos
    user_query = User.query.filter_by(email=email, password=password).first()
    if email != user_query.email or password != user_query.password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user()), 200


@api.route('/pedido', methods=['GET'])
@jwt_required()
def order_user():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


# USER-----------------------------------------------------------------------------------------------

#Create a User
@api.route('/user', methods=['POST'])
def create_user():
    body = request.json

    if body is None:
        return "El cuerpo de la solicitud está vacío", 400
    if 'name' not in body:
        return 'Debes especificar el nombre (name)', 400
    if 'address' not in body:
        return 'Debes especificar una dirección (address)', 400
    if 'email' not in body:
        return 'Debes especificar un correo electrónico (email)', 400
    if 'password' not in body:
        return 'Debes especificar una contraseña (password)', 400
    if 'is_active' not in body:
        return 'Debes especificar si el usuario está activo', 400

    user = User(name = body["name"], address = body["address"], email = body["email"], password = body["password"], is_active = body["is_active"])
    db.session.add(user)
    db.session.commit()

    response_body = {
        "msg": "Usuario creado!",
        "id": user.id
    }

    return jsonify(response_body), 200

#Get all users
@api.route('/users', methods=['GET'])
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
@api.route('/users/<int:user_id>', methods=['GET'])
def get_one_user(user_id):
    #filter all users by id
    user_query = User.query.filter_by(id = user_id).first()

    if user_query is None:
        return jsonify({"msg": "User with id: " + str(user_id) + " doesn't exist"}), 404
    
    response_body = {
        "msg": "User is", 
        "result": user_query.serialize()
    }

    return jsonify(response_body), 200

# Product-----------------------------------------------------------------------------------------------

#Create a Product
@api.route('/product', methods=['POST'])
def create_product():
    body = request.json

    if body is None:
        return "El cuerpo de la solicitud está vacío", 400
    if 'name' not in body:
        return 'Debes especificar el nombre (name)', 400
    if 'price' not in body:
        return 'Debes especificar un precio (price)', 400
    if 'category' not in body:
        return 'Debes especificar una categoria (category: PERROS, GATOS, ROEDORES, PECES, PAJAROS)', 400
    if 'image' not in body:
        return 'Debes especificar una imagen (image: URL)', 400
    if 'description' not in body:
        return 'Debes especificar una descripción (description)', 400
    
    category_value = body.get('category')
    
    # Comprobar si el valor de category_value está en Category
    try:
        if Category[category_value] not in Category:
            return 'Debes especificar una categoria válida (category: PERROS, GATOS, ROEDORES, PECES, PAJAROS)', 400
    except KeyError:
        return 'Debes especificar una categoria válida (category: PERROS, GATOS, ROEDORES, PECES, PAJAROS)', 400

    product = Product(name = body["name"], price = body["price"], category = body["category"], image = body["image"], description = body["description"])
    db.session.add(product)
    db.session.commit()

    response_body = {
        "msg": "Producto creado!",
        "id": product.id
    }

    return jsonify(response_body), 200

#Get all Products
@api.route('/products', methods=['GET'])
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
@api.route('/products/<int:products_id>', methods=['GET'])
def get_one_product(products_id):
    #filter all Product by id
    Product_query = Product.query.filter_by(id = products_id).first()

    if Product_query is None:
        return jsonify({"msg": "Product with id: " + str(products_id) + " doesn't exist"}), 404
    
    response_body = {
        "msg": "Produt is", 
        "result": Product_query.serialize()
    }

    return jsonify(response_body), 200

    # OrderItems-----------------------------------------------------------------------------------------------

    #Create a orderitems
@api.route('/orderitems', methods=['POST'])
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
@api.route('/orderitems', methods=['GET'])
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
@api.route('/OrderItems/<int:OrderItems_id>', methods=['GET'])
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
@api.route('/order', methods=['POST'])
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
@api.route('/order', methods=['GET'])
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
@api.route('/Order/<int:Order_id>', methods=['GET'])
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