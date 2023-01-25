from flask import Blueprint, request
from flask_login import login_required, current_user
# from app.models import Tweet, db, Reply
# from app.forms import TweetForm, ReplyForm
from app.models import Tweet, db


tweet_routes = Blueprint('tweet', __name__, )


@tweet_routes.route("")
def get_tweets():
    tweets = Tweet.query.all()

    return {tweet.id: tweet.to_dict() for tweet in tweets}


@tweet_routes.route("", methods=['POST'])
@login_required
def create_tweet():
    data = request.json
    new_tweet = Tweet(**data,  user_id=current_user.id)
    db.session.add(new_tweet)
    db.session.commit()

    return new_tweet.to_dict()

@tweet_routes.route('/<int:id>')
def get_biz_by_id(id):

    tweet = Tweet.query.get(id)

    return tweet.to_dict()


@tweet_routes.route('/<int:id>', methods=['DELETE'])
def delete_tweet(id):
    delete_tweet = Tweet.query.get(id)
    db.session.delete(delete_tweet)
    db.session.commit()
    return {"message": "tweet deleted"}

@tweet_routes.route("/<int:id>/comments")
def get_tweets_replies(id):
    comments = Reply.query.filter(Reply.tweet_id == id).all()

    return {comment.id: comment.to_dict() for comment in comments}


# @tweet_routes.route("/<int:id>", methods=['POST'])
# @login_required
# def create_tweets_replies():
#     current_user_id = int(current_user.get_id())

#     form = ReplyForm()
#     new_comment = Reply(
#         user_id = current_user_id,
#         body = form.data['body'],
#         image = form.data['image']
#     )

#     db.session.add(new_comment)
#     db.session.commit()
#     return new_comment.to_dict()
