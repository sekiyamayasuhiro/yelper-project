import "./UpdateReviewFormModal.css";
import { FaStar } from "react-icons/fa";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateReview, getReviewsByCurrentUser } from "../../redux/review.js";

const UpdateReviewFormModal = ({
    reviewId,
    userId,
    businessId,
    initialReviewText,
    initialRating,
}) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [review, setReview] = useState(initialReviewText);
    const [hoverRating, setHoverRating] = useState(0);
    const [rating, setRating] = useState(initialRating);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedReviewFormData = {
            id: reviewId,
            user_id: userId,
            business_id: businessId,
            rating,
            review_text: review,
        };

        await dispatch(updateReview(updatedReviewFormData)).then(() => {
            dispatch(getReviewsByCurrentUser());
        });

        closeModal();
    };

    return (
        <div className="update-review-container">
            <h2 className="update-review-title">Edit Review</h2>
            <form onSubmit={handleSubmit} className="review-content">
                <div>
                    <textarea
                        rows="5"
                        placeholder="Update your review here..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    ></textarea>
                </div>
                <div className="review-stars">
                    {[1, 2, 3, 4, 5].map((star) => {
                        const isFilled = star <= (hoverRating || rating);

                        return (
                            <span
                                key={star}
                                className={`star ${isFilled ? "filled" : ""}`}
                                onMouseEnter={() => {
                                    setHoverRating(star);
                                }}
                                onMouseLeave={() => {
                                    setHoverRating(0);
                                }}
                                onClick={() => setRating(star)}
                            >
                                <FaStar />
                            </span>
                        );
                    })}
                    <span className="stars-text">Stars</span>
                </div>
                <button
                    type="submit"
                    disabled={rating === 0 || review?.length < 10}
                >
                    Update Your Review
                </button>
            </form>
        </div>
    );
};

export default UpdateReviewFormModal;
