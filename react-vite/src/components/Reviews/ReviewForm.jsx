import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBusinessDetailsById } from '../../redux/business'
import { GoStarFill } from "react-icons/go";
import { createNewReview, getReviewsByCurrentUser, updateReview } from "../../redux/review";
import './ReviewForm.css'
import { LoadingSpinner } from "../LoadingSpinner";

export default function ReviewForm() {
    const { businessId } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('')
    const [reviewId, setReviewId] = useState(null)
    const [validatonErrors, setValidationErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const starvalue = ['', 'Not good', "Could've been better", 'OK', 'Good', 'Great']
    const business = useSelector((state) =>
        state.businessState[businessId] ? state.businessState[businessId] : []
    );
    const userId = useSelector((state) => state.session?.user?.id);
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        dispatch(getReviewsByCurrentUser()).then(res => {
            if (res && res.length > 0) {
                const businessReview = res.filter(review => +review.business_id === +businessId && +review.user_id === +userId)
                if (businessReview && businessReview.length > 0) {
                    setRating(businessReview[0].rating)
                    setReviewText(businessReview[0].review_text)
                    setReviewId(businessReview[0].id)
                    setIsEditing(true)
                }
            }
        })
    }, [userId, businessId, dispatch])

    useEffect(() => {
        const errors = {}
        if (rating === 0) errors.rating = 'Please add a star rating to complete your review.'
        if (reviewText?.length < 10) errors.reviewText = 'Your review needs at least 10 characters. Add a few thoughts to post review.'
        setValidationErrors(errors)
    }, [rating, reviewText])

    useEffect(() => {
        dispatch(getBusinessDetailsById(businessId)).then(() =>
            setIsLoaded(true)
        );
    }, [dispatch, businessId]);

    const handleSubmit = async () => {
        setSubmitted(true)
        if (Object.keys(validatonErrors)?.length !== 0) return

        setIsLoaded(true);

        const newReview = {
            user_id: userId,
            business_id: businessId,
            rating,
            review_text: reviewText
        }
        await dispatch(createNewReview(newReview))
        setIsLoaded(false);
        setIsEditing(false)
        navigate('/review_share', { state: { reviewPosted: true } })
    }

    const handleEdit = async () => {
        setIsEditing(true)
        const updatedReview = {
            id: reviewId,
            user_id: userId,
            business_id: businessId,
            rating,
            review_text: reviewText
        }
        await dispatch(updateReview(updatedReview))
        setIsLoaded(false);
        navigate('/review_share', { state: { reviewPosted: true } })
    }

    if (!isLoaded) return <LoadingSpinner />


    return (
        <>
            {isLoaded && (
                <div className="writereview-container">
                    <h3 className="business-name">{business.name}</h3>
                    <div className="review-text-area" >
                        <div className="star-rating-writereview">
                            {[...Array(5)].map((_, index) => {
                                const isFilled = index < (hoverRating || rating);
                                return (
                                    <span key={index}
                                        className={`star-writereview ${isFilled ? 'filled' : ''}`}
                                        onMouseEnter={() => setHoverRating(index + 1)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => setRating(index + 1)}
                                        >
                                    <span className="star-icon-writereview"><GoStarFill /></span>
                                    </span>)
                            })}
                        <div>{rating === 0 && hoverRating === 0 ? 'Select your rating' : starvalue[rating] || starvalue[hoverRating]}</div>
                        </div>
                        <div className="reviewText-container">
                            <textarea name="reviewText" id="" value={reviewText} onChange={(e) => setReviewText(e.target.value)} rows={15} cols={15} maxLength={200}></textarea>
                        </div>
                    </div>
                    {submitted && <div className="errors">{validatonErrors.rating || validatonErrors.reviewText}</div>}
                    {reviewText.length >= 200 && <p style={{ color: 'gray' }}>You have reached the maximum of 200 characters for the review text.</p>}
                    <button className="post-review-button" type="submit" onClick={isEditing ? handleEdit : handleSubmit}>{isEditing  ? 'Update Review' : 'Post Review'}</button>
                </div>
            )}
        </>

    )
}
