from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Review, Business
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

# Get all reviews of the current user
@review_routes.route('/current', methods=['GET'])
@login_required
def get_current_user_reviews():
    """
    Fetches all reviews of the logged-in user.
    """
    data = Review.query.filter(Review.user_id == current_user.id).all()
    # return jsonify([review.to_dict() for review in reviews]), 200

    print(data)
    reviews = [{**review.to_dict(), 'name': review.business.name, 'category': review.business.category, 'address': review.business.city + " " + review.business.state} for review in data]
    return jsonify(reviews)

# Update a review
@review_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def update_review(review_id):
    """
    Updates a review owned by the logged-in user.
    """
    review = Review.query.get(review_id)
    if review is None:
        return jsonify({'message': 'Review could not be found'}), 404

    if review.user_id != current_user.id:
        return jsonify({'message': 'Unauthorized'}), 403

    updated_data = request.json
    required_fields = ['rating', 'review_text']
    missing_fields = [field for field in required_fields if field not in updated_data]

    if missing_fields:
        error_messages = {field: f'{field} is required' for field in missing_fields}
        return jsonify({'errors': error_messages}), 400

    for key in required_fields:
        if key in updated_data:
            setattr(review, key, updated_data[key])

    db.session.commit()
    return jsonify(review.to_dict()), 200

# Delete a review
@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    """
    Deletes a review owned by the logged-in user.
    """
    review = Review.query.get(review_id)
    if not review:
        return jsonify({'message': 'Review could not be found'}), 404

    if review.user_id != current_user.id:
        return jsonify({'message': 'Unauthorized'}), 403

    db.session.delete(review)
    db.session.commit()
    return jsonify({'message': 'Successfully deleted'}), 200
