from flask import Blueprint, jsonify, request
from app.models import Business, Review, Image, db
from flask_login import current_user, login_required
from app.forms import ReviewForm, ImageForm

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
    # required_fields = ['name', 'address', 'city', 'state', 'country', 'postal_code', 'lat', 'lng', 'category', 'phone_number', 'website', 'description', 'price']
    required_fields = ['name', 'address', 'city', 'state', 'country', 'postal_code', 'category', 'phone_number', 'website', 'description', 'price']
    missing_fields = [field for field in required_fields if not business_data.get(field)]

    if missing_fields:
        error_messages = {field: f'{field} is required' for field in missing_fields}
        return jsonify({'errors': error_messages}), 400

    business_data['owner_id'] = current_user.id

    new_business = Business(**business_data)
    db.session.add(new_business)
    db.session.commit()
    return jsonify(new_business.to_dict()), 201
    # return jsonify({'message': 'Success'})


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
    return jsonify(business.to_dict())

###
# Get all reviews by the business' id
@business_routes.route('/<int:business_id>/reviews', methods=['GET'])
def get_reviews_by_business(business_id):
    """
    Fetches all reviews for a specific business.
    """
    business = Business.query.get(business_id)
    if not business:
        return jsonify({'message': 'Business could not be found'}), 404

    reviews = Review.query.filter(Review.business_id == business_id).all()
    return jsonify([review.to_dict() for review in reviews]), 200

# Create a review for a business based on the business' id
@business_routes.route('/<int:business_id>/reviews', methods=['POST'])
@login_required
def create_review_for_business(business_id):
    """
    Creates a review for a business by a logged-in user.
    """
    business = Business.query.get(business_id)
    if not business:
        return jsonify({'message': 'Business could not be found'}), 404

    review_data = request.json
    required_fields = ['rating', 'review_text']
    missing_fields = [field for field in required_fields if field not in review_data]

    if missing_fields:
        error_messages = {field: f'{field} is required' for field in missing_fields}
        return jsonify({'errors': error_messages}), 400

    new_review = Review(
        user_id=current_user.id,
        business_id=business_id,
        rating=review_data['rating'],
        review_text=review_data['review_text']
    )
    db.session.add(new_review)
    db.session.commit()
    return jsonify(new_review.to_dict()), 201

# Get all images by a business' id
@business_routes.route('/<int:business_id>/images', methods=['GET'])
def get_images_by_business(business_id):
    """
    Fetches all images for a specific business.
    """
    business = Business.query.get(business_id)
    if not business:
        return jsonify({'message': 'Business could not be found'}), 404

    images = Image.query.filter(Image.business_id == business_id).all()

    return jsonify([image.to_dict() for image in images]), 200

# Create an image for a business based on the business' id
@business_routes.route('/<int:business_id>/images', methods=['POST'])
@login_required
def create_image_for_business(business_id):
    """
    Creates an image for a business by a logged-in user.
    """
    business = Business.query.get(business_id)
    if not business:
        return jsonify({'message': 'Business could not be found'}), 404

    image_data = request.json
    required_fields = ['url']
    missing_fields = [field for field in required_fields if field not in image_data]

    if missing_fields:
        error_messages = {field: f'{field} is required' for field in missing_fields}
        return jsonify({'errors': error_messages}), 400

    new_image = Image(
        user_id=current_user.id,
        business_id=business_id,
        url=image_data['url']
    )
    db.session.add(new_image)
    db.session.commit()
    return jsonify(new_image.to_dict()), 201

# Search businesses
@business_routes.route('/search', methods=['GET'])
def search_businesses():
    """
    Search businesses by name, category, and/or price level.
    """
    name = request.args.get('name', type=str)
    category = request.args.get('category', type=str)
    price_level = request.args.get('price_level', type=int)

    search_filter = Business.query

    if name:
        search_filter = search_filter.filter(Business.name.ilike(f'%{name}%'))

    if category:
        search_filter = search_filter.filter_by(category=category)

    if price_level:
        search_filter = search_filter.filter_by(price=price_level)

    results = search_filter.all()

    return jsonify([business.to_dict() for business in results]), 200

# Get current owner's businesses
@business_routes.route('/user_businesses', methods=['GET'])
@login_required
def get_businesses_by_current_user():
    """
    Fetch all businesses owned by the logged-in user.
    """
    current_user_id = current_user.id
    businesses = Business.query.filter(Business.owner_id == current_user_id).all()
    return jsonify([business.to_dict() for business in businesses]), 200
