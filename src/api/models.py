from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    address = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "email": self.email
             # do not serialize the password, its a security breach
        }
    

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    price = db.Column(db.String(100), unique=True, nullable=False)
    category = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<Product {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "desccription": self.description
            
        }
    

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    totalAmount = db.Column(db.String(100), unique=True, nullable=False)
    orderStatus = db.Column(db.String(100), unique=True, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)


    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "totalAmount": self.totalAmount,
            "orderStatus": self.orderStatus
            
            
        }
    


class OrderItems(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    orderId = db.Column(db.String(100), unique=True, nullable=False)
    ProductsId = db.Column(db.String(100), unique=True, nullable=False)
    quantity = db.Column(db.String(120), unique=True, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "orderId": self.orderId,
            "ProductsId": self.ProductsId,
            "quantity": self.quantity
            
        }