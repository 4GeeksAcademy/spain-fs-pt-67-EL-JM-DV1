from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User, Product, OrderItems, Order, Category
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


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

# Create a User
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

    user = User(name=body["name"], address=body["address"], email=body["email"], password=body["password"], is_active=body["is_active"])
    db.session.add(user)
    db.session.commit()

    response_body = {
        "msg": "Usuario creado!",
        "id": user.id
    }

    return jsonify(response_body), 200

# Get all users
@api.route('/users', methods=['GET'])
def get_users():
    users_querys = User.query.all()
    results = list(map(lambda user: user.serialize(), users_querys))

    if not results:
        return jsonify({"msg": "No registered users"}), 404
    
    response_body = {
        "msg": "These are the registered users", 
        "results": results
    }
    return jsonify(response_body), 200

# Get user by id
@api.route('/users/<int:user_id>', methods=['GET'])
def get_one_user(user_id):
    user_query = User.query.filter_by(id=user_id).first()

    if user_query is None:
        return jsonify({"msg": f"User with id: {user_id} doesn't exist"}), 404
    
    response_body = {
        "msg": "User is", 
        "result": user_query.serialize()
    }
    return jsonify(response_body), 200

# Product-----------------------------------------------------------------------------------------------

# Create a Product
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
    
    try:
        if Category[category_value] not in Category:
            return 'Debes especificar una categoria válida (category: PERROS, GATOS, ROEDORES, PECES, PAJAROS)', 400
    except KeyError:
        return 'Debes especificar una categoria válida (category: PERROS, GATOS, ROEDORES, PECES, PAJAROS)', 400

    product = Product(name=body["name"], price=body["price"], category=body["category"], image=body["image"], description=body["description"])
    db.session.add(product)
    db.session.commit()

    response_body = {
        "msg": "Producto creado!",
        "id": product.id
    }

    return jsonify(response_body), 200

# Get all Products
@api.route('/products', methods=['GET'])
def get_products():
    products_querys = Product.query.all()
    results = list(map(lambda product: product.serialize(), products_querys))

    if not results:
        return jsonify({"msg": "No registered Products"}), 404
    
    response_body = {
        "msg": "These are the registered Products", 
        "results": results
    }
    return jsonify(response_body), 200

# Get Product by id
@api.route('/products/<int:product_id>', methods=['GET'])
def get_one_product(product_id):
    product_query = Product.query.filter_by(id=product_id).first()

    if product_query is None:
        return jsonify({"msg": f"Product with id: {product_id} doesn't exist"}), 404
    
    response_body = {
        "msg": "Product is", 
        "result": product_query.serialize()
    }
    return jsonify(response_body), 200

# OrderItems-----------------------------------------------------------------------------------------------

# Create OrderItems
@api.route('/orderitems', methods=['POST'])
def create_orderitems():
    orderitems_data = request.get_json()

    orderitems = OrderItems(orderid=orderitems_data["OrderID"], productid=orderitems_data["ProductID"], quantity=orderitems_data["Quantity"])
    
    if not (orderitems.orderid and orderitems.productid and orderitems.quantity):
        return jsonify({'message': 'All fields are required'}), 400

    db.session.add(orderitems)
    db.session.commit()
    
    return jsonify({'message': 'OrderItems registered successfully'}), 201

# Get all OrderItems
@api.route('/orderitems', methods=['GET'])
def get_orderitems():
    orderitems_querys = OrderItems.query.all()
    results = list(map(lambda orderitem: orderitem.serialize(), orderitems_querys))

    if not results:
        return jsonify({"msg": "No registered OrderItems"}), 404
    
    response_body = {
        "msg": "These are the registered OrderItems", 
        "results": results
    }
    return jsonify(response_body), 200

# Get OrderItems by id
@api.route('/orderitems/<int:orderitems_id>', methods=['GET'])
def get_one_orderitems(orderitems_id):
    orderitems_query = OrderItems.query.filter_by(id=orderitems_id).first()

    if orderitems_query is None:
        return jsonify({"msg": f"OrderItems with id: {orderitems_id} doesn't exist"}), 404
    
    response_body = {
        "msg": "OrderItems is", 
        "result": orderitems_query.serialize()
    }
    return jsonify(response_body), 200

# Order-----------------------------------------------------------------------------------------------

# Create an Order
@api.route('/order', methods=['POST'])
def create_order():
    order_data = request.get_json()

    order = Order(UserID=order_data["UserID"], totalamount=order_data["TotalAmount"], orderstatus=order_data["OrderStatus"])
    
    if not (order.UserID and order.totalamount and order.orderstatus):
        return jsonify({'message': 'All fields are required'}), 400

    db.session.add(order)
    db.session.commit()
    
    return jsonify({'message': 'Order registered successfully'}), 201

# Get all Orders
@api.route('/orders', methods=['GET'])
def get_orders():
    orders_querys = Order.query.all()
    results = list(map(lambda order: order.serialize(), orders_querys))

    if not results:
        return jsonify({"msg": "No registered Orders"}), 404
    
    response_body = {
        "msg": "These are the registered Orders", 
        "results": results
    }
    return jsonify(response_body), 200

# Get Order by id
@api.route('/orders/<int:order_id>', methods=['GET'])
def get_one_order(order_id):
    order_query = Order.query.filter_by(id=order_id).first()

    if order_query is None:
        return jsonify({"msg": f"Order with id: {order_id} doesn't exist"}), 404
    
    response_body = {
        "msg": "Order is", 
        "result": order_query.serialize()
    }
    return jsonify(response_body), 200
