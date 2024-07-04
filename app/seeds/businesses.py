from app.models import db, Business, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_businesses():
    users = db.session.query(User).all()
    gym = Business(
        owner_id=users[0].id,
        name='Fitness SF - Fillmore',
        address='1455 Fillmore St.',
        city='San Francisco',
        state='CA',
        country='USA',
        postal_code='94115',
        lat=37.78310736326294,
        lng=-122.4337057942806,
        category='Gym',
        phone_number='4153486377',
        website='www.fitnesssf.com',
        description='Everyone loves to hang out at the pool. Take a swim at this luxurious gym in the base of the Fillmore Center that provides a 25-Meter Saline Pool, Hot Tub, Dry Saunas and an array of Functional Training Equipment.',
        price=3
    )
    ramen = Business(
        owner_id=users[1].id,
        name='Marufuku Ramen',
        address='1581 Webster St. #235',
        city='San Francisco',
        state='CA',
        country='USA',
        postal_code='94115',
        lat=37.78512904795339,
        lng=-122.43200837465552,
        category='Restaurant',
        phone_number='4158729786',
        website='www.marufukuramen.com/',
        description='Marufuku proudly serves authentic Hakata-style Tonkotsu ramen — featuring a milky and umami-rich broth made from boiling pork bones for long hours, ultra-thin artisanal noodles that match perfectly with the broth, and cha-shu made from specially selected pork.',
        price=2
    )
    coffee = Business(
        owner_id=users[2].id,
        name='Blue Bottle Coffee - Pacific Heights',
        address='2453 Fillmore St.',
        city='San Francisco',
        state='CA',
        country='USA',
        postal_code='94115',
        lat=37.792703005891525,
        lng=-122.43460527618339,
        category='Coffee',
        phone_number='5106533394',
        website='www.bluebottlecoffee.com',
        description='We started our company with a vow insisting that we would only sell coffee within 48 hours of roasting. Coffee does not necessarily taste best within 48 hours, but we wanted to get our coffee into your hands quickly, so you could enjoy the ascent to peak flavor. Flavor in coffee is a crescendo--no part of the journey is boring.',
        price=1
    )

    businesses = [gym, ramen, coffee]
    for business in businesses:
        db.session.add(business)
    db.session.commit()


def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM businesses"))

    db.session.commit()
