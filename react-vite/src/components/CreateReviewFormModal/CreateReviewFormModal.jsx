import "./CreateReviewFormModal.css";
import { FaStar } from "react-icons/fa";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewReview, getReviewsByBusinessId } from "../../redux/review.js";
import { getBusinessDetailsById } from "../../redux/business.js";
import { useSelector } from "react-redux";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem.jsx";

const CreateReviewFormModal = ({ businessId, userId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [review, setReview] = useState("");
    const [hoverRating, setHoverRating] = useState(0);
    const [rating, setRating] = useState(0);
    const isLoggedIn = useSelector((state) => state.session.user != null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReviewFormData = {
            user_id: userId,
            business_id: businessId,
            rating,
            review_text: review,
        };

        await dispatch(createNewReview(newReviewFormData))
            .then(() => {
                dispatch(getReviewsByBusinessId(businessId));
            })
            .then(() => {
                dispatch(getBusinessDetailsById(businessId));
            });

        closeModal();
    };

    return (
        <div>
            {isLoggedIn ? (
                <div className="create-review-form-modal">
                    <h1>How was your visit?</h1>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            rows="5"
                            placeholder="Review must be 10 characters long"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        ></textarea>
                        <div className="review-stars">
                            {[1, 2, 3, 4, 5].map((star) => {
                                const isFilled =
                                    star <= (hoverRating || rating);
                                return (
                                    <span
                                        key={star}
                                        className={`star ${
                                            isFilled ? "filled" : ""
                                        }`}
                                        onMouseEnter={() =>
                                            setHoverRating(star)
                                        }
                                        onMouseLeave={() => setHoverRating(0)}
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
                            disabled={rating === 0 || review.length < 10}
                        >
                            Submit Your Review
                        </button>
                    </form>
                </div>
            ) : (
                <OpenModalMenuItem itemText="Please login to Write a Review" />
            )}
        </div>
    );
};

export default CreateReviewFormModal;
