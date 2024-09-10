from app.models import db, Review, User, Business, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    users = db.session.query(User).all()
    businesses = db.session.query(Business).all()

    review1 = Review(
        user_id = users[0].id,
        business_id = businesses[1].id,
        rating = 4,
        review_text = 'Amazing!'
    )
    review2 = Review(
        user_id = users[2].id,
        business_id = businesses[1].id,
        rating = 5,
        review_text = 'Excellent!'
    )
    review3 = Review(
        user_id = users[0].id,
        business_id = businesses[2].id,
        rating = 3,
        review_text = 'Magnificent!'
    )
    reviews = [review1, review2, review3]
    for review in reviews:
        db.session.add(review)
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
