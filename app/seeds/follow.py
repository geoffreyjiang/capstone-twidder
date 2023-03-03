from app.models import db, following, environment, SCHEMA

def seed_follow():
    one = following(
        follower_id=1,
        followed_id=2
    )

    db.session.add(one)
    db.session.commit()




# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.

def undo_follow():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.following RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM following")

    db.session.commit()
