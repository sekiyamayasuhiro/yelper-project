import BusinessesIndex from "../BusinessesIndex"
import SearchBar from "../SearchBar/SearchBar"

function ReviewOverview () {
    return (
        <div>
            <h2>Find a business to review</h2>
            <p>Review anything from your favorite patio spot to your local flower shop.</p>
            <SearchBar />
            <h3>Visited one of these places recently?</h3>
            <BusinessesIndex />
        </div>
    )
}

export default ReviewOverview
