from flask import Blueprint, jsonify
from app.models import Business

business_routes = Blueprint('businesses', __name__)


@business_routes.route('/')
def display_all_businesses():
    data = Business.query.all()
    businesses = [business.to_dict() for business in data]
    return {'Businesses': businesses}
