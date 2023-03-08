from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import User, db, following, Tweet
import sys

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



@user_routes.route('/<int:id>/following')
def get_following_tweet(id):
    user = User.query.get(id)
    user_following = user.following
    tweets = Tweet.query.all()
    following_tweets = [tweet for tweet in tweets if tweet.user_id in [el.id for el in user_following]]
    return {tweet.id: tweet.to_dict() for tweet in following_tweets}


@user_routes.route('/<int:id>/following', methods=['DELETE'])
def delete_following_tweets(id):
    user = User.query.get(id)
    # user_following = user.following
    # tweets = Tweet.query.all()
    # following_tweets = [tweet for tweet in tweets if tweet.user_id in [el.id for el in user_following]]
    # for tweet in following_tweets:
    #     db.session.delete(tweet)
    # db.session.commit()
    return {'unfollowed': user.id}

@user_routes.route('/<int:id>', methods=['POST'])
def follow_user(id):
    follower = User.query.get(id)
    follow_user = User.query.get(current_user.get_id())
    follower.follows.append(follow_user)
    db.session.commit()
    return {'followed': follower.to_dict()}



@user_routes.route('/<int:id>', methods=['DELETE'])
def unfollow_user(id):
    follower = User.query.get(id)
    follow_user = User.query.get(current_user.get_id())
    follower.follows.remove(follow_user)
    db.session.commit()
    return {'message': 'unfollowed'}
