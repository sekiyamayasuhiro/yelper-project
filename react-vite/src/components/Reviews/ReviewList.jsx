import StarRating from "./StarRating"
import { useEffect, useState } from "react";
import SortFilterControls from "../Reviews/SortFilterControls";

export default function ReviewList ({ avgRating, reviews }) {
    const [filteredReviews, setFilteredReviews] = useState(reviews)
    const [sort, setSort] = useState('')
    const [rating, setRating] = useState(0)

    useEffect(() => {
        let sortedReviews = [...reviews]

        // Filter by rating
        if (rating > 0) {
            sortedReviews = sortedReviews.filter(review => +review.rating === +rating)
        }

        // Sort reviews
        if (sort === 'newest') {
            sortedReviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else if (sort === 'oldest') {
            sortedReviews.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        } else if (sort === 'highest') {
            sortedReviews.sort((a, b) => b.rating - a.rating);
        } else if (sort === 'lowest') {
            sortedReviews.sort((a,b) => a.rating - b.rating)
        }
        setFilteredReviews(sortedReviews)
    }, [sort, rating, reviews])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const options = { year: "numeric", month: "long",  day: 'numeric'}
        return date.toLocaleDateString("en-US", options)
    }

    return (
        <div className="reviews-container">
            {avgRating > 0 && <SortFilterControls rating={rating} setRating={setRating} sort={sort} setSort={setSort}/>}
            {avgRating > 0 && filteredReviews.length < 1 ? 'No results found' : filteredReviews.map(({id, rating, created_at, review_text, yelper_name}) => (
                <div key={id} className="review-container">
                    <h4>{yelper_name}</h4>
                    <div className="rating-date"><StarRating rating={rating}/><p className="review-date">{formatDate(created_at)}</p></div>
                    <p className="review-text">{review_text}</p>
                </div>
            ))}
        </div>
    )
}
