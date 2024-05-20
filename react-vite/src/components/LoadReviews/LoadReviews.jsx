import { useDispatch } from "react-redux";
import { getReviewsByBusinessId } from "../../redux/review";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa"

function LoadReviews ({ businessId }) {
    const dispatch = useDispatch();
    const reviews = useSelector((state) =>
        Object.values(state.reviewState) ? Object.values(state.reviewState) : []
    );

    useEffect(() => {
        dispatch(getReviewsByBusinessId(businessId))
    }, [dispatch, businessId])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const options = { year: "numeric", month: "long",  day: 'numeric'}
        return date.toLocaleDateString("en-US", options)
    }

    let numReviews
    const reviewCount = reviews?.length;
    if (reviewCount === 0) {
        numReviews = 'No Reviews yet'
    } else if (reviewCount === 1) {
        numReviews = '1 Review'
    } else {
        numReviews = `${reviewCount} Reviews`
    }

    return (
        <>
            <div>{numReviews}</div>
            <div className="reviews-container">
            {reviews.map(({id, rating, created_at, review_text, yelper_name}) => (
                <div key={id}>
                    <p>{yelper_name}</p>
                    <p><FaStar /> {rating} {formatDate(created_at)}</p>
                    <p>{review_text}</p>
                </div>
            ))}
            </div>
        </>
    )
}

export default LoadReviews
