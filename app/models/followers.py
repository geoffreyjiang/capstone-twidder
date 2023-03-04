from .db import db, SCHEMA, environment, add_prefix_for_prod



follows = db.Table(
    'follows',
    db.Column('follower_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('followed_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
)

if environment == "production":
     follows.schema = SCHEMA
