from .db import db, environment, SCHEMA, add_prefix_for_prod

class Follow(db.Model):
    __tablename__ = 'followers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    follower_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)


    user_follow = db.relationship("User", back_populates='follow')
    user_follower = db.relationship("User", back_populates='follower')

    def __repr__(self):
        return f"<Reply id: {self.id}, user_id: {self.user_id}, follower_id: {self.follower_id}>"


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "follower_id": self.follower_id
        }
