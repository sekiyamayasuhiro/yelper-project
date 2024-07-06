import { Link } from "react-router-dom";
import ReviewsSummary from "../Reviews/ReviewsSummary";
import "./BusinessCard.css";

const BusinessCard = ({ business }) => {
    const { id, name, city, state, price, category, BusinessImages, avgRating, numReviews } = business;

    const imageUrl =
        BusinessImages && BusinessImages.length > 0
            ? BusinessImages[0].url
            : "https://pbs.twimg.com/media/FgfRWcSVsAEi6y2?format=jpg&name=small";

    const priceString = "$".repeat(price);

    return (
        <div className="business-card">
            <Link to={`/businesses/${id}`}>
                <div className="business-image">
                    <img src={imageUrl} alt={name} />
                </div>
                <div className="business-info">
                    <h2 className="business-name">{name}</h2>
                    <ReviewsSummary avgRating={avgRating} numReviews={numReviews}/>
                    <p className="price-category">{`${priceString} · ${category}`}</p>
                    <p>{`${city}, ${state}`}</p>
                    {/* <p className="recent-review">{mostRecentReview}</p> */}
                </div>
            </Link>
        </div>
    );
};

export default BusinessCard;
