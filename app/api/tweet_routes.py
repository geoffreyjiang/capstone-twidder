from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Tweet, db, Reply
from app.forms import TweetForm, ReplyForm


tweet_routes = Blueprint('tweet', __name__)


@tweet_routes.route("")
def get_tweets():
    tweets = Tweet.query.all()

    return {tweet.id: tweet.to_dict() for tweet in tweets}


@tweet_routes.route("", methods=['POST'])
def create_tweet():
    data = request.json
    new_tweet = Tweet(**data,  user_id=current_user.id)
    db.session.add(new_tweet)
    db.session.commit()

    return new_tweet.to_dict()
