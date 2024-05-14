from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Image

image_routes = Blueprint('business-images', __name__)

@image_routes.route('/<int:image_id>', methods=['DELETE'])
@login_required
def delete_image(image_id):
    """
    Deletes an image belonging to a specific business of a logged-in user.
    """
    image = Image.query.get(image_id)
    if not image:
        return jsonify({'message': 'Image could not be found'}), 404

    if image.user_id != current_user.id:
        return jsonify({'message': 'Unauthorized'}), 403

    db.session.delete(image)
    db.session.commit()
    return jsonify({'message': 'Successfully deleted'}), 200
