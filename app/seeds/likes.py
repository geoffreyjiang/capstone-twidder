from app.models import db, Like , environment, SCHEMA


def seed_likes():
    one = Like(
        tweet_id=1, user_id=3)
    two =Like(
        tweet_id=1, user_id=1)
    three = Like(
        tweet_id=3, user_id=3)
    four = Like(
        tweet_id=2, user_id=1)

    db.session.add(one)
    db.session.add(two)
    db.session.add(three)
    db.session.add(four)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM likes")

    db.session.commit()
