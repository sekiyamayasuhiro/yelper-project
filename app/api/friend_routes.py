"""
Remove Friend: DELETE /api/friends/<int:user_id>/remove
Add Friend: POST /api/friends/request

View Friends Reviews: GET /api/reviews/<int:friend_id>
View Friend's Images: GET /api/images/<int:friend_id>



"""
from flask import Blueprint, jsonify, request
from app.models import Friend, db
from flask_login import current_user, login_required

friend_routes = Blueprint('friends', __name__)

@friend_routes.route('/<int:user_id>')
def get_friends_by_user_id(user_id):
    """
    Get friends list by user Id

    """
    data = db.session.query(Friend).filter(Friend.user_id == user_id)

    if not data:
        return jsonify({'message':  'No friends yet'}), 404

    friends = [friend.to_dict() for friend in data]

    return friends


@friend_routes.route('/<int:friend_id>/remove')
def remove_friend_by_user_id(friend_id):
    # Find the friendship
    friends = db.session.query(Friend).filter(Friend.user_id == current_user.id and Friend.status == 'accepted').all()
    # if friends:
    #     doomedFriend = [friend.to_dict() for friend in friends if friend.friend_id == friend_id]

    #     if doomedFriend:
    #         doomedFriend = Friend.query.get(doomedFriend[0].id)
    #         db.session.delete(doomedFriend)
    #         db.session.commit()
    #         return jsonify({'message': f'{current_user.id} Successfully unfriend {friend_id}'})
    #     else:
    #         return 'Error'
