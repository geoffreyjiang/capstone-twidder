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
# def get_followers(id):
#     print('----------------------------------------------------', following)


    # followers = following.query.all()

    # return {follow.id: follow.to_dict() for follow in followers}



@user_routes.route('/<int:id>/follow', methods=['POST'])
def follow_user(id):
    follower_id = current_user.get_id()
    data = request.json
    main_id = data['user_id']
    follower = User.query.get(follower_id)
    followed_user = User.query.get(main_id)
    follower.followed.append(followed_user)
    db.session.commit()
    return { 'user': "followed"}
