import StarRating from "../Reviews/StarRating";

export default function OverallRating ({ avgRating, reviews }) {
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
        <div className="overall-rating">
            <span>
                <h4>Overall rating</h4>
                <p><StarRating rating={avgRating}/></p>
                <p>{numReviews}</p>
            </span>
        </div>
    )
}
