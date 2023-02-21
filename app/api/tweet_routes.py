from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Tweet, db, Reply, Like
from app.forms import TweetForm, ReplyForm, LikeForm
from datetime import datetime
# from app.models import Tweet, db


tweet_routes = Blueprint('tweet', __name__, )


@tweet_routes.route("")
def get_tweets():
    tweets = Tweet.query.all()

    return {tweet.id: tweet.to_dict() for tweet in tweets}


@tweet_routes.route("", methods=['POST'])
@login_required
def create_tweet():
    data = request.json
    new_tweet = Tweet(**data,  user_id=current_user.id, created_at=datetime.now())
    db.session.add(new_tweet)
    db.session.commit()

    return new_tweet.to_dict()

@tweet_routes.route('/<int:id>')
def get_tweet_by_id(id):

    tweet = Tweet.query.get(id)

    return tweet.to_dict()

@tweet_routes.route('<int:id>', methods=['PUT'])
@login_required
def edit_tweet(id):
    tweet = Tweet.query.get(id)
    form = TweetForm()

    tweet.body = form.data['body']
    tweet.image = form.data['image']

    db.session.commit()

    return tweet.to_dict()


@tweet_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_tweet(id):
    deleted = Tweet.query.get(id)
    db.session.delete(deleted)
    db.session.commit()
    return {"message": "tweet deleted"}




# replies
@tweet_routes.route("/<int:id>/replies")
def get_tweets_replies(id):
    reply = Reply.query.filter(Reply.tweet_id == id).all()

    return {replys.id: replys.to_dict() for replys in reply}

@tweet_routes.route('/reply/<int:id>')
def get_reply_by_id(id):

    reply = Reply.query.get(id)

    return reply.to_dict()


@tweet_routes.route("/<int:id>", methods=['POST'])
@login_required
def create_tweets_replies(id):
    current_user_id = int(current_user.get_id())

    form = ReplyForm()
    new_comment = Reply(
        user_id = current_user_id,
        body = form.data['body'],
        image = form.data['image'],
        tweet_id = id
    )

    db.session.add(new_comment)
    db.session.commit()
    return new_comment.to_dict()


# likes
@tweet_routes.route('/<int:id>/likes')
def get_tweet_likes(id):
    tweet = Tweet.query.get(id)

    likes = Like.query.filter(Like.tweet_id == id).all()

    return {like.id: like.to_dict() for like in likes}

@tweet_routes.route('/<int:id>/likes', methods=['POST'])
def post_tweet_likes(id):
    current_user_id = int(current_user.get_id())

    form = LikeForm()
    liked = Like(
        isLiked = form.data['isLiked'],
        tweet_id = id,
        user_id = current_user_id,
    )

    db.session.add(liked)
    db.session.commit()
    return liked.to_dict()

@tweet_routes.route('/<int:id>/likes', methods=['PUT'])
@login_required
def edit_like(id):
    like = Like.query.get(id)
    form = LikeForm()

    like.isLiked = form.data['isLiked']
    like.user_id = form.data['user_id']
    like.tweet_id = form.data['tweet_id']
    db.session.commit()

    return like.to_dict()
