from .db import db, environment, SCHEMA

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
    rating = db.Column(db.Integer)
    review_text = db.Column(db.String(100))
    # created_at = db.Column(db.DateTime, default=datetime.now)
    # updated_at = db.Column(db.Datetime, default=datetime.now)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "business_id": self.business_id,
            "rating": self.rating,
            "review_text": self.review_text,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }

    # Relationships
    user = db.relationship('User', back_populates='reviews')
    business = db.relationship('Business', back_populates='reviews')
