"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import stripe
from flask import Flask, request, jsonify, url_for, Blueprint, redirect
from api.models import db, User, Product, Order, OrderItems, Category, OrderStatus
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from decimal import Decimal


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
# Clave secreta de Stripe
stripe.api_key = 'sk_test_51Po4fAJA9bLtD1vVbJmjVxmEbMFcfoPV4M7aNLDksHg85U90JAl8EWsrRh8HS1N1d4006kxTYr8GGOHfAjb4rbqT002xneECYI'

@api.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    url_frontend = os.getenv('FRONTEND_URL')

    try:
        data = request.get_json()

        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'eur',
                    'product_data': {
                        'name': data['name'],
                    },
                    'unit_amount': data['amount'],
                },
                'quantity': data['quantity'],
            }],
            mode='payment',
            success_url = url_frontend + '/success',
            cancel_url = url_frontend + '/cancel',
        )

        return jsonify({'id': session.id})

    except Exception as e:
        return jsonify(error=str(e)), 403
# Login----------------------------------------------------------------------------------------------
@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    # Aquí deberías validar contra tu base de datos
    user_query = User.query.filter_by(email=email).first()

    if email != user_query.email or not(check_password_hash(user_query.password, password)):
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

# REGISTRO-------------------------------------------------------------------------------------------
@api.route('/registro', methods=['POST'])
def registro():
    body = request.json

    if not body:
        return jsonify({"msg": "El cuerpo de la solicitud está vacío"}), 400
    if 'name' not in body:
        return jsonify({"msg": 'Debes especificar el nombre (name)'}), 400
    if 'email' not in body:
        return jsonify({"msg": 'Debes especificar un correo electrónico (email)'}), 400
    if 'password' not in body:
        return jsonify({"msg": 'Debes especificar una contraseña (password)'}), 400
    if 'address' not in body:
        return jsonify({"msg": 'Debes especificar una dirección (address)'}), 400

    hashed_password = generate_password_hash(body['password'])
    new_user = User(
        name=body['name'],
        email=body['email'],
        password=hashed_password,
        address=body['address'],  
        is_active=True
    )
    

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({"msg": "Error al registrar el usuario", "error": str(e)}), 500

    access_token = create_access_token(identity=new_user.email)
    return jsonify({"msg": "Usuario registrado exitosamente", "token": access_token}), 201


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

    # Verificar se o email já está cadastrado
    existing_user = User.query.filter_by(email=body['email']).first()
    if existing_user:
        return jsonify({"msg": "O email já está cadastrado. Tente com um diferente."}), 409

    # Criar um novo usuário
    user = User(
        name=body["name"],
        address=body["address"],
        email=body["email"],
        password=body["password"],
        is_active=body["is_active"]
    )
    db.session.add(user)
    db.session.commit()

    response_body = {
        "msg": "Usuário criado!",
        "id": user.id
    }

    return jsonify(response_body), 201  

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
# Order Status---------------------------------------------------------------------------------------
@api.route('/order-status/<int:order_id>', methods=['GET'])
@jwt_required()
def get_order_status(order_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    # Verificar se o pedido existe e pertence ao usuário
    order = Order.query.filter_by(id=order_id, user_id=user.id).first()

    if not order:
        return jsonify({"msg": "Order not found or does not belong to the user"}), 404

    response_body = {
        "order_id": order.id,
        "status": order.orderstatus.name  # assuming orderstatus is an enum
    }

    return jsonify(response_body), 200


# Crear pedido y agregar producto al carrito
@api.route('/cesta', methods=['POST'])
@jwt_required()
def addToKart():
    addedToKart = False

    # recuperar usuario
    current_user = get_jwt_identity()
    user = User.query.filter_by(email = current_user).first()

    # recuperar información del producto
    data = request.get_json()
    product_id = data['id']
    product_price = data['price']

    # validaciones de los datos que nos llegan desde el Frontend
    if not product_id or not product_price:
        return jsonify("Informar ID y precio del producto"), 400

    # Consulta para comprobar si el usuario ya tiene una cesta de compras pendiente de pago
    order = Order.query.filter_by(user_id=user.id, order_status = OrderStatus.PENDIENTE).first()

    if order is None:
        # Caso el usuario no tenga ninguna cesta de compras, creamos un pedido en la tabla Order y añadimos el producto en la tabla OrderItems
        new_order = Order(user_id=user.id, total_amount=product_price, order_status=OrderStatus.PENDIENTE)
        db.session.add(new_order)
        db.session.commit()

        new_order_item = OrderItems(order_id=new_order.id, product_id=product_id, quantity=1)
        db.session.add(new_order_item)
        db.session.commit()

        addedToKart = True
    else:
        # Caso el usuario tenga una cesta de compras, actualizamos el total_amount de Order y hacemos una select para comprobar si en OrderItems existe el producto que el usuario quiere comprarse
        order.total_amount = order.total_amount + Decimal(product_price)

        order_item = OrderItems.query.filter_by(order_id=order.id, product_id=product_id).first()

        if order_item is None:
            # Caso no exista el producto en OrderItems, lo añadimos en la misma
            new_order_item = OrderItems(order_id=order.id, product_id=product_id, quantity=1)
            db.session.add(new_order_item)
            db.session.commit()

            addedToKart = True
        else:
            # Caso exista el producto en OrderItems, actualizamos el valor de quantity
            order_item.quantity = order_item.quantity + 1
            db.session.commit()

            addedToKart = True

    return jsonify({"msg": "Pedido creado", "result": addedToKart}), 200
# Perros ----------------------------------------------------------------------------------------------------
# Get Products by Category (e.g., 'PERROS', 'GATOS', etc.)
@api.route('/products', methods=['GET'])
def get_products_by_category():
    category_filter = request.args.get('category', None)

    if category_filter:
        try:
            # Validar la categoría utilizando la enumeración Category
            category_enum = Category[category_filter.upper()]
        except KeyError:
            return jsonify({"msg": f"Categoria '{category_filter}' no es válida. Debes especificar una categoría válida: PERROS, GATOS, ROEDORES, PECES, PAJAROS"}), 400

        # Filtrar productos por categoría
        products_querys = Product.query.filter_by(category=category_enum).all()
    else:
        # Devolver todos los productos si no se pasa un filtro de categoría
        products_querys = Product.query.all()

    results = list(map(lambda products: products.serialize(), products_querys))

    if not results:
        return jsonify({"msg": "No registered Products"}), 404

    response_body = {
        "msg": "These are the registered Products",
        "results_count": len(results),
        "results": results
    }

    return jsonify(response_body), 200


# Listar todos los pedidos de un usuario
@api.route('/order-list', methods=['GET'])
@jwt_required()
def getAllUserOrders():
    # recuperar usuario
    current_user = get_jwt_identity()
    user = User.query.filter_by(email = current_user).first()

    # Consultar la tabla Order filtrando por el usuario
    order_all = Order.query.filter_by(user_id=user.id).all()

    # Creamos la lista de pedidos con el resultado de la consulta de la tabla Order
    orders = list(map(lambda order: order.serialize(), order_all))

    return jsonify({"msg": "Lista de pedidos del usuario", "results": orders}), 200

# Listar todos los productos de un pedido por usuario
@api.route('/order-items/<int:id_order>', methods=['GET'])
@jwt_required()
def getAllItems(id_order):
    # recuperar usuario
    current_user = get_jwt_identity()
    user = User.query.filter_by(email = current_user).first()

    # Consultar Order con el ID del pedido para comprobar el estado del pedido
    order = Order.query.filter_by(user_id = user.id, id = id_order).first()

    # Consultar la tabla OrderItems filtrando por el ID del pedido
    order_items_all = OrderItems.query.filter_by(order_id = id_order).all()

    # Crear una lista para almacenar los datos combinados
    items_list = []

    # Recorrer los elementos de OrderItems
    for order_item in order_items_all:
        # Consultar el producto relacionado con este order_item
        producto = Product.query.get(order_item.product_id)

        # Crear un diccionario con la información necesaria
        item_data = {
            "id": producto.id,
            "product_name": producto.name,
            "product_image": producto.image,
            "quantity": order_item.quantity,
            "price": producto.price
        }

        # Agregar el diccionario a la lista
        items_list.append(item_data)


    return jsonify( {"msg": "Lista de productos del pedido", "results": items_list, "status": order.serialize()} ), 200

# Listar todos los productos del carrito de compras del usuario
@api.route('/carrito', methods=['GET'])
@jwt_required()
def getAllKartItems():
    # recuperar usuario
    current_user = get_jwt_identity()
    user = User.query.filter_by(email = current_user).first()

    # Consultar Order con el ID del pedido para comprobar el estado del pedido
    order = Order.query.filter_by(user_id = user.id, order_status = OrderStatus.PENDIENTE).first()

    if order is None:
        return jsonify({"msg": "No hay órdenes pendientes para este usuario.", "results": [], "status": ""}), 404

    # Consultar la tabla OrderItems filtrando por el ID del pedido
    order_items_all = OrderItems.query.filter_by(order_id = order.id).all()

    # Crear una lista para almacenar los datos combinados
    items_list = []

    # Recorrer los elementos de OrderItems
    for order_item in order_items_all:
        # Consultar el producto relacionado con este order_item
        producto = Product.query.get(order_item.product_id)

        # Crear un diccionario con la información necesaria
        item_data = {
            "id": producto.id,
            "product_name": producto.name,
            "product_image": producto.image,
            "quantity": order_item.quantity,
            "price": producto.price
        }

        # Agregar el diccionario a la lista
        items_list.append(item_data)


    return jsonify( {"msg": "Lista de productos del carrito", "results": items_list, "status": order.serialize()} ), 200

# Quitar un producto del carrito de compras
@api.route('/quitar', methods=['PUT'])
@jwt_required()
def removeItemKart():
    # recuperar usuario
    current_user = get_jwt_identity()
    user = User.query.filter_by(email = current_user).first()

    # recuperar información del producto
    data = request.get_json()
    product_id = data['id']

    # Consultar Order con el ID del pedido para comprobar el estado del pedido
    order = Order.query.filter_by(user_id = user.id, order_status = OrderStatus.PENDIENTE).first()

    # Consultar la tabla OrderItems filtrando por el ID del pedido y el ID del producto que queremos quitar del carrito
    order_item = OrderItems.query.filter_by(order_id=order.id, product_id=product_id).first()

    # Si la cantidad del producto es mayor que 1, simplemente reduce la cantidad
    if order_item.quantity > 1:
        order_item.quantity -= 1
        order.total_amount -= Product.query.get(product_id).price
    else:
        # Si la cantidad es 1, elimina el registro de OrderItems
        db.session.delete(order_item)
        order.total_amount -= Product.query.get(product_id).price

    # Si el total_amount es 0, borramos el pedido de Order
    if order.total_amount <= 0:
        db.session.delete(order)
    
    db.session.commit()

    return jsonify( {"msg": "El producto fue quitado del carrito!"} ), 200

@api.route('/success', methods=['PUT'])
@jwt_required()
def success():
    # recuperar usuario
    current_user = get_jwt_identity()
    user = User.query.filter_by(email = current_user).first()

    # recuperar información del frontend
    data = request.get_json()
    payed = data['payed']

    if payed:
        # Consultar Order con el ID del usuario y que tenga status pendiente para actualizarlo a recibido
        order = Order.query.filter_by(user_id = user.id, order_status = OrderStatus.PENDIENTE).first()
        order.order_status = OrderStatus.RECIBIDO
        db.session.commit()

        return jsonify( {"msg": "El estado del pedido ha sido actualizado!"} ), 200
    else:
        return jsonify( {"msg": "Error al actualizar el estado del pedido!"} ), 400