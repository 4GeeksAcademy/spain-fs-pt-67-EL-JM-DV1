from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False, nullable=False)
    address = db.Column(db.String(200), unique=False, nullable=False)
    email = db.Column(db.String(40), unique=True, nullable=False)
    password = db.Column(db.String(20), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.id

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
    name = db.Column(db.String(100), unique=False, nullable=False)
    price = db.Column(db.Numeric(10, 2), unique=False, nullable=False)
    category = db.Column(db.String(20), unique=True, nullable=False) # OJO Hacerlo Enum
    image = db.Column(db.String(500), unique=False, nullable=False)
    description = db.Column(db.String(500), unique=False, nullable=False)

    def __repr__(self):
        return '<Product %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "category": self.category,
            "image": self.image,
            "description": self.description
        }
    
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    total_amount = db.Column(db.Numeric(10, 2), unique=False, nullable=False)
    order_status = db.Column(db.String(20), unique=True, nullable=False) # OJO Hacerlo Enum

    def __repr__(self):
        return '<Order %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "total_amount": self.total_amount,
            "order_status": self.order_status
        }
    
class Order_items(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), unique=True, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), unique=True, nullable=False)
    quantity = db.Column(db.Integer(100), nullable=False)

    def __repr__(self):
        return '<Order_items %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "product_id": self.product_id,
            "quantity": self.quantity
        }