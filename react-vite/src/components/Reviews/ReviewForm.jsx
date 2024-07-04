import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBusinessDetailsById } from '../../redux/business'
import { GoStarFill } from "react-icons/go";
import { createNewReview } from "../../redux/review";

import './ReviewForm.css'

export default function ReviewForm() {
    const { businessId } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('')
    const [validatonErrors, setValidationErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const starvalue = ['', 'Not good', "Could've been better", 'OK', 'Good', 'Great']
    const business = useSelector((state) =>
        state.businessState[businessId] ? state.businessState[businessId] : []
    );
    const userId = useSelector((state) => state.session?.user?.id);

    useEffect(() => {
        const errors = {}
        if (rating === 0) errors.rating = 'Please add a star rating to complete your review.'
        if (reviewText.length < 10) errors.reviewText = 'Your review needs at least 10 characters. Add a few thoughts to post review.'
        setValidationErrors(errors)
    }, [rating, reviewText])

    useEffect(() => {
        dispatch(getBusinessDetailsById(businessId)).then(() =>
            setIsLoaded(true)
        );
    }, [dispatch, businessId]);

    const handleSubmit = async () => {
        setSubmitted(true)
        console.log(validatonErrors)
        if (Object.keys(validatonErrors).length !== 0) return

        const newReview = {
            user_id: userId,
            business_id: businessId,
            rating,
            review_text: reviewText
        }
        await dispatch(createNewReview(newReview))
        navigate('/review_share')
    }


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
                            <textarea name="reviewText" id="" value={reviewText} onChange={(e) => setReviewText(e.target.value)} rows={15} cols={15}></textarea>
                        </div>
                    </div>
                    {submitted && <div className="errors">{validatonErrors.rating || validatonErrors.reviewText}</div>}
                    <button className="post-review-button" type="submit" onClick={handleSubmit}>Post Review</button>
                </div>
            )}
        </>

    )
}
