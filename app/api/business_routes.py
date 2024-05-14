from flask import Blueprint, jsonify, request
from app.models import Business, Review, Image, db
from flask_login import current_user, login_required

business_routes = Blueprint('businesses', __name__)


@business_routes.route('/')
def get_all_businesses():
    data = Business.query.all()
    businesses = [business.to_dict() for business in data]
    return jsonify({'Businesses': businesses})


@business_routes.route('/<int:business_id>')
def get_business(business_id):
    data = db.session.query(Business).join(Review).join(Image).filter(Business.id == business_id == Review.business_id == Image.business_id).all()

    if not data:
        return jsonify({'message': 'Business not found'}), 404

    business = [{**business.to_dict(), 'BusinessReviews': [review.to_dict() for review in business.reviews], 'BusinessImages': [image.to_dict() for image in business.images]} for business in data]

    return business[0]


# Delete business by id
@login_required
@business_routes.route('/<int:business_id>', methods=['DELETE'])
def delete_business(business_id):
    doomedbusiness = Business.query.get(business_id)

    if not doomedbusiness:
        return jsonify({'message': 'Business not found'}), 404

    isAuthorized = current_user.id == doomedbusiness.owner_id

    if isAuthorized:
        db.session.delete(doomedbusiness)
        db.session.commit()
        return jsonify({'message': 'Successfully deleted'})


# Create business
@login_required
@business_routes.route('/', methods=['POST'])
def create_business():
    business_data = request.json
    required_fields = ['name', 'address', 'city', 'state', 'country', 'postal_code', 'lat', 'lng', 'category', 'phone_number', 'website', 'description', 'price']
    missing_fields = [field for field in required_fields if not business_data.get(field)]

    if missing_fields:
        error_messages = {field: f'{field} is required' for field in missing_fields}
        return jsonify({'errors': error_messages}), 400

    business_data['owner_id'] = current_user.id
    new_business = Business(**business_data)
    db.session.add(new_business)
    db.session.commit()
    return jsonify({**new_business}), 201


# Edit business by id
@login_required
@business_routes.route('/<int:business_id>', methods=['PUT'])
def edit_business(business_id):
    business = Business.query.get(business_id)

    if not business:
        return jsonify({'message': 'Business not found'}), 404

    if business.owner_id != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403

    updated_data = request.json

    for key, val in updated_data.items():
        setattr(business, key, val)

    db.session.commit()
    return jsonify({business})
