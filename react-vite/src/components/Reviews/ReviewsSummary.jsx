import StarRating from './StarRating'
import './ReviewsSummary.css'

export default function ReviewsSummary ({ avgRating, numReviews}) {
    const reviews = () => {
        let reviews
        if (numReviews === 1) reviews = `(${numReviews} review)`
        if (numReviews > 1) reviews = `(${numReviews} reviews)`
        if (numReviews === 0) reviews = 'No Reviews Yet'
        return reviews
    }
    return (
        <div className="reviews-summary">
            <StarRating rating={avgRating}/>
            <p className='average-rating'>{avgRating?.toFixed(1)}</p>
            <div className="rating-info">
                <p className="num-reviews">{reviews()}</p>
            </div>
        </div>
    )
}
