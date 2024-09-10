from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .friend import Friend


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(10))
    last_name = db.Column(db.String(10))
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        # Format the created_at field
        formatted_created_at = self.created_at.strftime('%B %Y') if self.created_at else None
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'reviews': [review.to_dict() for review in self.reviews],
            'created_at': formatted_created_at,
            'first_name': self.first_name,
            'last_name': self.last_name
        }

    # Relationships
    businesses = db.relationship('Business', back_populates='owner')
    reviews = db.relationship('Review', back_populates='user')
    images = db.relationship('Image', back_populates='user')
    friends = db.relationship('Friend', back_populates='user', foreign_keys='Friend.user_id')
    friend_friends = db.relationship('Friend', back_populates='friend', foreign_keys='Friend.friend_id')
