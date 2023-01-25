from .db import db, environment, SCHEMA, add_prefix_for_prod

class Reply(db.Model):
    __tablename__ = 'replies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=True)
    tweet_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tweets.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    reply_tweet = db.relationship("Tweet", back_populates='tweet_reply')
    reply_owner = db.relationship("User", back_populates='reply')

    def __repr__(self):
        return f"<Reply id: {self.id}, body: {self.body}, image: {self.image}, tweet_id: {self.tweet_id}, user_id: {self.user_id}>"


    def to_dict(self):
        return {
            "id": self.id,
            "body": self.body,
            "image": self.image,
            "tweet_id": self.tweet_id,
            "user_id": self.user_id,
            "username": self.reply_owner.to_dict()['username']
        }
