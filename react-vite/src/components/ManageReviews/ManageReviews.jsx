import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsByCurrentUser } from "../../redux/review.js";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from "../DeleteReviewModal";
import StarRating from "../Reviews/StarRating.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './ManageReviews.css';

const ManageReviews = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const reviews = useSelector((state) =>
        Object.values(state.reviewState) ? Object.values(state.reviewState) : []
    );

    useEffect(() => {
        dispatch(getReviewsByCurrentUser());
    }, [dispatch]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "long", day: 'numeric' };
        return date.toLocaleDateString("en-US", options);
    };

    return (
        <div className="manage-reviews-container">
            <h3>Reviews</h3>

            {reviews.map((review) => (
                <div key={review.id} className="review-container">
                    <div className="review-container-right">
                        <div className="review-header">
                            <img src={review.business?.url} alt="" />
                            <div className="review-details">
                                <h3>{review.business.name}</h3>
                                <p>
                                    {review.business.category}
                                    <br />
                                    {review.business.address}
                                </p>
                            </div>
                        </div>
                        <div className="review-body">
                            <div className="review-rating">
                                <StarRating rating={review.rating} />
                            </div>
                            <div className="review-date">{formatDate(review.created_at)}</div>
                        </div>
                        <p>{review.review_text}</p>
                    </div>
                    <div className="review-footer">
                        <div className="menu-container">
                            <button className="menu-button" onClick={toggleMenu}>...</button>
                            {menuOpen && (
                                <div className="menu-dropdown">
                                    <button onClick={() => navigate(`/businesses/${review.business_id}/writeareview`)}>
                                        Write an update
                                    </button>
                                    <button>
                                        <OpenModalMenuItem
                                            itemText="Remove Review"
                                            modalComponent={<DeleteReviewModal reviewId={review.id} />}
                                        />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ManageReviews;
