from flask import Blueprint, jsonify, abort
from app.models import Business, Image, Review
from app.models import db
from flask_login import current_user
from sqlalchemy.orm import joinedload

business_routes = Blueprint('businesses', __name__)


@business_routes.route('/')
def get_all_businesses():
    data = Business.query.all()
    businesses = [business.to_dict() for business in data]
    return {'Businesses': businesses}


@business_routes.route('/<int:business_id>')
def get_business(business_id):
    data = Business.query.options(joinedload(Business.images), joinedload(Business.reviews)).get(business_id)

    if not data:
        abort(404)

    business = data.to_dict()
    images = [image.to_dict() for image in data.images]
    reviews = [review.to_dict() for review in data.reviews]

    res = {
        **business,
        'BusinessImages': images,
        'BusinessReviews': reviews
    }

    return jsonify(res)


@business_routes.route('/<int:business_id>', methods=['DELETE'])
def delete_business(business_id):
    business = Business.query.get(business_id)

    if not business:
        abort(404)

    isAuthorized = current_user.id == business.owner_id

    if isAuthorized:
        db.session.delete(business)
        db.session.commit()
        return {'message': 'Successfully deleted'}
    else:
        abort(403)
