from .db import db, environment, SCHEMA
from .db import add_prefix_for_prod

class Friend(db.Model):
    __tablename__ = 'friends'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    friend_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    status = db.Column(db.String, default='pending') # status can be 'pending', 'accepted', 'rejected'
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    # Relationships
    user = db.relationship('User', back_populates='friends')
    friend = db.relationship('User', back_populates='friend_friends')

    def to_dict(self):
        return {
            'id': self.id,
            'friend_id': self.friend_id,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
