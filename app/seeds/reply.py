from app.models import db, Reply, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_replies():
    one = Reply(
        body='First reply!', image='null', user_id=3, tweet_id=1)
    two = Reply(
        body='Second reply!', image='null', user_id=1, tweet_id=2)
    three = Reply(
        body='Third reply!', image='null', user_id=2, tweet_id=3)

    db.session.add(one)
    db.session.add(two)
    db.session.add(three)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_replies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.replies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM replies")

    db.session.commit()
