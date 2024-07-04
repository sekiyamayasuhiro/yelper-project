import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getReviewsByBusinessId } from "../../redux/review";
import "./BusinessCard.css";

const BusinessCard = ({ business }) => {
    const dispatch = useDispatch();
    const { id, name, city, state, price, category, BusinessImages } = business;

    // Fetching reviews for the specific business
    // useEffect(() => {
    //     dispatch(getReviewsByBusinessId(id));
    // }, [dispatch, id]);

    // const reviews = useSelector((state) => state.reviewState[id] || []);

    const imageUrl =
        BusinessImages && BusinessImages.length > 0
            ? BusinessImages[0].url
            : "https://pbs.twimg.com/media/FgfRWcSVsAEi6y2?format=jpg&name=small";

    const priceString = "$".repeat(price);

    // const mostRecentReview =
    //     reviews.length > 0 ? reviews[0].review_text : "No reviews yet.";

    return (
        <div className="business-card">
            <Link to={`/businesses/${id}`}>
                <div className="business-image">
                    <img src={imageUrl} alt={name} />
                </div>
                <div className="business-info">
                    <h2 className="business-name">{name}</h2>
                    <p className="stars-reviews">INSERT COMPONENT HERE</p>
                    <p className="price-category">{`${priceString} · ${category}`}</p>
                    <p>{`${city}, ${state}`}</p>
                    {/* <p className="recent-review">{mostRecentReview}</p> */}
                </div>
            </Link>
        </div>
    );
};

export default BusinessCard;
