from .db import db, environment, SCHEMA, add_prefix_for_prod


if environment == "production":
    __table_args__ = {'schema': SCHEMA}


following = db.Table(
    'following',
    db.Column('follower_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('followed_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
)
# class Follower(db.Model):
#     __tablename__ = 'follower'

#     id = db.Column(db.Integer, primary_key=True)
#     follower_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')))
#     followed_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')))

#     follower_user = db.relationship("User", back_populates='followers')
#     followed_user = db.relationship("User", back_populates='followed')



# def to_dict(self):
#         return {'id': self.id, 'follower_id': self.follower_id, 'followed_id': self.followed_id}
