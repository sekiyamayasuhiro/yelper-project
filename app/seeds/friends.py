from app.models import db, Friend, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_friends():
    users = db.session.query(User).all()
    demoId = users[0].id
    marnieId = users[1].id
    bobbieId = users[2].id

    friendship1 = Friend(
        user_id=demoId,
        friend_id=marnieId,
        status='accepted'

    )
    friendship2 = Friend(
        user_id=demoId,
        friend_id=bobbieId,
        status='accepted'

    )
    friendship3 = Friend(
        user_id=marnieId,
        friend_id=bobbieId,
        status='accepted'
    )

    friendships = [friendship1, friendship2, friendship3]
    for friendship in friendships:
        db.session.add(friendship)
    db.session.commit()



def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends"))

    db.session.commit()
