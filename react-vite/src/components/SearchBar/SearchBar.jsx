import './SearchBar.css'

function SearchBar() {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Restaurant, Salon, Gym"/>
            <input type="text" placeholder="address, city, state or zip"/>
            <button>Search</button>
            {/* <div >Price
                <ul className="price">
                    <li>$</li>
                    <li>$$</li>
                    <li>$$$</li>
                </ul>
            </div>
            <div >Category
                <ul className="category">
                    <li>Restaurant</li>
                    <li>Coffee</li>
                    <li>Gym</li>
                    <li>Salon</li>
                </ul>
            </div> */}
        </div>

    )
}

export default SearchBar
