from .db import db, environment, SCHEMA
from sqlalchemy.sql import func
from .review import Review
from .db import add_prefix_for_prod

class Business(db.Model):
    __tablename__ = 'businesses'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(30), nullable=False)
    address = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(45), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    country = db.Column(db.String, nullable=False)
    postal_code = db.Column(db.Integer, nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
    category = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.BigInteger, nullable=False)
    website = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(450), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    # Relationships
    owner = db.relationship('User', back_populates='businesses')
    reviews = db.relationship('Review', back_populates='business', cascade='all, delete-orphan')
    images = db.relationship('Image', back_populates='business', cascade='all, delete-orphan')

    def to_dict(self):
        first_review_text = None
        reviews = self.reviews

        if reviews:
            first_review = reviews[0]
            first_review_text = first_review.review_text

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
            'updated_at': self.updated_at,
            "images": [image.to_dict() for image in self.images] if self.images else [],
            "reviews": [review.to_dict() for review in self.reviews] if self.reviews else [],
            "avgRating": self.avg_rating(),
            'numReviews': self.numReviews(),
            'firstReviewText': first_review_text
        }
    def avg_rating(self):
        average = db.session.query(func.avg(Review.rating)).filter(Review.business_id == self.id).scalar()
        return float(average) if average else None

    def numReviews(self):
        reviews = db.session.query(Review).filter(Review.business_id == self.id).all()
        return len(reviews)
