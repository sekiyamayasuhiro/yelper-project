import timeAgo from '../../utils/timeAgo'
import StarRating from './StarRating'
import { useNavigate } from 'react-router-dom';
import './ReviewCard.css'

function ReviewCard ({ review }) {
    const navigate = useNavigate()

    function renderPrice(priceLevel) {
        return '$'.repeat(priceLevel);
    }

    const handleClick = () => {
        navigate(`/businesses/${review.business_id}`)
    }

    return (
        <div className="review-card-container">
            <div className="review-card-content">
                <div className="review-card-header">
                    <p>{review.user} wrote a review</p>
                    <p>{timeAgo(review.created_at)}</p>
                </div>
                <hr className="review-card-divider" />
                <div className="review-card-body">
                    <p className='review-card-business-name' onClick={handleClick}>{review.business}</p>
                    <StarRating rating={review.rating} />
                    <p>
                        {renderPrice(review.price)} <span className="dot-separator">•</span> {review.category}
                    </p>
                    <p className="reviewcard-text">{review.review_text}</p>
                </div>
            </div>
        </div>
    )
}

export default ReviewCard
