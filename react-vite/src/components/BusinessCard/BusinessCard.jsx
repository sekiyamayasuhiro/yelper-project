import { Link, useNavigate } from "react-router-dom";
import ReviewsSummary from "../Reviews/ReviewsSummary";
import "./BusinessCard.css";

const BusinessCard = ({ business }) => {
    const navigate = useNavigate()
    const { id, name, city, state, price, category, images, avgRating, numReviews } = business;

    const imageUrl =
        images && images.length > 0
            ? images[0].url
            : "https://pbs.twimg.com/media/FgfRWcSVsAEi6y2?format=jpg&name=small";

    const priceString = "$".repeat(price);

    const handleClick = () => {
        navigate(`/businesses/${id}`)
    }

    return (
        <div className="business-card">
            <Link to={`/businesses/${id}`}>
                <div className="business-card-content">
                    <div className="business-image">
                        <img src={imageUrl} alt={name} />
                    </div>
                    <div className="business-info">
                        <h2>{name}</h2>
                        <ReviewsSummary avgRating={avgRating} numReviews={numReviews}/>
                        <p className="price-category"><span className="business-card-cat">{category}</span> <span>{priceString}</span><span>•</span> {city}</p>
                        {business.firstReviewText && <p>"{business.firstReviewText}" <span className="more" onClick={handleClick}>more</span></p>}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default BusinessCard;
