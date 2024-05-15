import './UpdateReviewFormModal.css';
import { FaStar } from 'react-icons/fa';
import { useModal } from '../../context/Modal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateReview } from '../../redux/review.js';

const UpdateReviewFormModal = ({ reviewId, sessionUser, businessId }) => {

    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [review, setReview] = useState('');
    const [hoverRating, setHoverRating] = useState(0);
    const [rating, setRating] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedReviewFormData = {
            id: reviewId,
            user_id: sessionUser.id,
            business_id: businessId,
            rating,
            review_text: review
        };

        await dispatch(updateReview(updatedReviewFormData));

        closeModal();
    };

    return (
        <div className="update-review-form-modal">
            <h1>How was your visit?</h1>

            <form onSubmit={handleSubmit}>

                <textarea
                    rows="5"
                    placeholder="Update your review here..."
                    value={review}
                    onChange={e => setReview(e.target.value)}>
                </textarea>

                <div className="review-stars">
                    {[1, 2, 3, 4, 5].map((star) => {
                        const isFilled = star <= (hoverRating || rating);

                        return (
                            <span key={star}
                                className={`star ${isFilled ? "filled" : ""}`}
                                onMouseEnter={() => { setHoverRating(star) }}
                                onMouseLeave={() => { setHoverRating(0) }}
                                onClick={() => setRating(star)}>
                                <FaStar />
                            </span>
                        );
                    })}
                    <span className="stars-text">Stars</span>
                </div>

                <button type="submit">Update Your Review</button>
            </form>
        </div>
    );
};

export default UpdateReviewFormModal;
