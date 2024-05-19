import { useDispatch } from "react-redux";
import { getReviewsByBusinessId } from "../../redux/review";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function LoadReviews ({ businessId }) {
    const dispatch = useDispatch();
    const reviews = useSelector((state) =>
        Object.values(state.reviewState) ? Object.values(state.reviewState) : []
    );
    console.log('reviews', reviews)

    useEffect(() => {
        dispatch(getReviewsByBusinessId(businessId))
    }, [dispatch, businessId])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const options = { year: "numeric", month: "long",  day: 'numeric'}
        return date.toLocaleDateString("en-US", options)
      }

    return (

        <div className="reviews-container">
            {reviews.map(({id, rating, created_at, review_text, yelper_name}) => (
                <div key={id}>
                    <p>{yelper_name}</p>
                    <p>** Rating {rating}*** {formatDate(created_at)}</p>
                    <p>{review_text}</p>
                </div>
            ))}
        </div>
    )
}

export default LoadReviews
