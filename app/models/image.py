from .db import db, environment, SCHEMA

class Image(db.Model):
    __tablename__ = 'images'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
    url = db.Column(db.String)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "business_id": self.business_id,
            "url": self.url,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }

    # Relationship
    user = db.relationship('User', back_populates='images')
    business = db.relationship('Business', back_populates='images')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'business_id': self.business_id,
            'url': self.url,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
