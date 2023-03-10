from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Tweet(db.Model):
    __tablename__ = 'tweets'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now().strftime("%b %d %Y"), nullable=True)
    tweet_owner = db.relationship("User", back_populates="tweet")
    tweet_liked = db.relationship("Like", back_populates='liked_tweet', cascade='all, delete')
    tweet_reply = db.relationship('Reply', back_populates='reply_tweet', cascade='all, delete')

    def __repr__(self):
        return f"<Tweet id: {self.id}, body: {self.body}, image: {self.image}, user_id: {self.user_id}, created_at: {self.created_at}>"

#
    def to_dict(self):
        likes = [like.to_dict()['user_id'] for like in self.tweet_liked]

        try:
            total = len(likes)
        except ZeroDivisionError:
            total = 0
        # print(datetime.now())
        return {
            "id": self.id,
            "body": self.body,
            "image": self.image,
            "user_id": self.user_id,
            "username": self.tweet_owner.to_dict()['username'],
            "firstName": self.tweet_owner.to_dict()['firstName'],
            "totalLikes": total,
            'likes': [like.to_dict() for like in self.tweet_liked],
            "likedBy": [like.to_dict()['user_id'] for like in self.tweet_liked],
            "profile_pic": self.tweet_owner.to_dict()['profile_pic'],
            'created_at': self.created_at.strftime("%b %d"),
            'sort_date': self.created_at.strftime("%b %d %Y")

        }

