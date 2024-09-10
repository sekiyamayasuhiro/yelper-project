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
        website='www.marufukuramen.com',
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
    oren = Business(
        owner_id=users[2].id,
        name="Oren's Hummus",
        address='19419 Stevens Creek Blvd.',
        city='Palo Alto',
        state='CA',
        country='USA',
        postal_code='94301',
        lat=37.4471,
        lng=-122.1607,
        category='Restaurant',
        phone_number='6507526492',
        website='www.orenshummus.com',
        description='When the original hummus shop opened on University Avenue in Palo Alto, California, serving fresh, healthy, authentic Mediterranean cuisine, quickly became a favorite of both locals and Stanford University students.',
        price=2
    )
    kajiken = Business(
        owner_id=users[2].id,
        name='Kajiken',
        address='112 S. B. Street',
        city='San Mateo',
        state='CA',
        country='USA',
        postal_code='94401',
        lat=37.5665,
        lng=-122.3248,
        category='Restaurant',
        phone_number='6501234567',
        website='www.kajikenusa.com',
        description='Aburasoba is a noodle dish similar to ramen, but instead of broth, the flavors come from our special blend of oils and sauces. Here at Kajiken, we focus on our fresh homemade noodles made specifically for Aburasoba, mixed with our secret sauces and specially selected toppings.',
        price=2
    )
    philz = Business(
        owner_id=users[2].id,
        name='Philz Coffee',
        address='42 Hillsdale Mall',
        city='San Mateo',
        state='CA',
        country='USA',
        postal_code='94403',
        lat=37.5399,
        lng=-122.3021,
        category='Coffee',
        phone_number='6508658239',
        website='www.philzcoffee.com',
        description='At Philz, we are as passionate about great tasting coffee, as we are about our commitment to our community.',
        price=1
    )
    samikcha = Business(
        owner_id=users[2].id,
        name='Samikcha Momo',
        address='146 E. 3rd avenue',
        city='San Mateo',
        state='CA',
        country='USA',
        postal_code='94401',
        lat=37.5648,
        lng=-122.3237,
        category='Restaurant',
        phone_number='6505136475',
        website='www.samikchamomo.com',
        description='About the Chef & Foods Samikcha momo reflects the unique geographical position of India and china. Indo-Chinese food is generally characterised by its ingredients: Indian vegetables ,Nepalese spices, Indian spices, Chinese sauces, thickening agents, and oil.',
        price=3
    )
    equinox = Business(
        owner_id=users[2].id,
        name='Equinox - San Mateo',
        address='4 East 4th avenue',
        city='San Mateo',
        state='CA',
        country='USA',
        postal_code='94401',
        lat=37.5643,
        lng=-122.3244,
        category='Gym',
        phone_number='6504037000',
        website='www.equinox.com',
        description='Power your most important parts. Enhance your core, back strength, and flexibility with a workout that makes you stand straighter, walk taller, and move better.',
        price=4
    )

    businesses = [gym, ramen, coffee, oren, kajiken, philz, samikcha, equinox]
    for business in businesses:
        db.session.add(business)
    db.session.commit()


def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM businesses"))

    db.session.commit()
