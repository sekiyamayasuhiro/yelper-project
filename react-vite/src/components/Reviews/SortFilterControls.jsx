import './ReviewList.css'

export default function SortFilterControls ({ rating, setRating, sort, setSort }) {
    return (
        <div className="sort-filter-container">
            <select name="Yelp Sort" id="" onChange={(e) => setSort(e.target.value)} value={sort}>
                <option value="">Yelp Sort</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
            </select>
            <select name="Filter by rating" id="" onChange={(e) => setRating(e.target.value)} value={rating}>
                <option value="">Filter by rating</option>
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 stars</option>
                <option value="">All ratings</option>
            </select>
        </div>
    )
}
