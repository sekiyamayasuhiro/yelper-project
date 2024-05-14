from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Business, Review, Image
from app.forms import ReviewForm, ImageForm

business_routes = Blueprint('businesses', __name__)

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

    form = ReviewForm()

    if request.is_json:
        data = request.get_json()
        form = ReviewForm(data=data)

    if form.validate_on_submit():
        new_review = Review(
            user_id=current_user.id,
            business_id=business_id,
            rating=form.rating.data,
            review_text=form.review_text.data
        )
        db.session.add(new_review)
        db.session.commit()
        return jsonify(new_review.to_dict()), 201
    else:
        return jsonify(form.errors), 400

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
    Creates an image for a business by logged-in user.
    """
    business = Business.query.get(business_id)
    if not business:
        return jsonify({'message': 'Business could not be found'}), 404

    form = ImageForm()

    if request.is_json:
        data = request.get_json()
        form = ImageForm(data=data)

    if form.validate_on_submit():
        new_image = Image(
            user_id=current_user.id,
            business_id=business_id,
            url=form.url.data,
        )
        db.session.add(new_image)
        db.session.commit()
        return jsonify(new_image.to_dict()), 201
    else:
        return jsonify(form.errors), 400
