from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, following
user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()



#Follow


# @user_routes.route('/<int:id>/follow')
# def get_follow(id):
#     follow = following.query.all()

#     return {follow.id: follow}

@user_routes.route('/<int:id>', methods=['POST'])
def follow_user(id):
    follower = User.query.get(int(id))
    follow_user = User.query.get(current_user.get_id())
    follower.follows.append(follow_user)
    db.session.commit()
    return { 'user': follower.to_dict()}



@user_routes.route('/<int:id>', methods=['DELETE'])
def unfollow_user(id):
    follower = User.query.get(int(id))
    follow_user = User.query.get(current_user.get_id())
    follower.follows.remove(follow_user)
    db.session.commit()
    return {"message": "user unfollowed"}
