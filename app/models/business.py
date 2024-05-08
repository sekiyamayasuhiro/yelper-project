from .db import db, environment, SCHEMA

class Business(db.Model):
    __tablename__ = 'businesses'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(30))
    address = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    country = db.Column(db.String)
    postal_code = db.Column(db.Integer)
    lat = db.Column(db.Integer)
    lng = db.Column(db.Integer)
    category = db.Column(db.String)
    phone_number = db.Column(db.Integer)
    website = db.Column(db.String)
    description = db.Column(db.String)
    price = db.Column(db.Numeric(10, 2))
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    # Relationships
    owner = db.relationship('User', back_populates='businesses')
    reviews = db.relationship('Review', back_populates='business')
    images = db.relationship('Image', back_populates='business')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'postal_code': self.postal_code,
            'lat': self.lat,
            'lng': self.lng,
            'category': self.category,
            'phone_number': self.phone_number,
            'website': self.website,
            'description': self.description,
            'price': self.price,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
