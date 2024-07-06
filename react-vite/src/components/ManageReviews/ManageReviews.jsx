import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsByCurrentUser } from "../../redux/review.js";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from "../DeleteReviewModal";
import StarRating from "../Reviews/StarRating.jsx";
import { useNavigate } from "react-router-dom";
import './ManageReviews.css'

const ManageReviews = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const reviews = useSelector((state) =>
        Object.values(state.reviewState) ? Object.values(state.reviewState) : []
    );

    useEffect(() => {
        dispatch(getReviewsByCurrentUser());
    }, [dispatch]);

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const options = { year: "numeric", month: "long",  day: 'numeric'}
        return date.toLocaleDateString("en-US", options)
    }

    return (
        <div>
            <h2>Reviews</h2>
            {reviews.map(review => (
                <div key={review.id} className="review-container" >
                    <div className="review-header">
                        <div className="review-details">
                            <h3>{review.name}</h3>
                            <p>{review.category}<br/>{review.address}</p>
                        </div>
                    </div>
                    <div className="review-body">
                        <div className="review-rating"><StarRating rating={review.rating}/></div>
                        <div className="review-date">{formatDate(review.created_at)}</div>
                        <p>{review.review_text}</p>
                    </div>
                    <div>
                        <div>
                            <button onClick={() => navigate(`/businesses/${review.business_id}/writeareview`)}>Edit Review</button>
                            <button>
                                <OpenModalMenuItem
                                    itemText="Remove Review"
                                    modalComponent={
                                    <DeleteReviewModal reviewId={review.id} />}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ManageReviews;
