import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBusinesses } from "../../redux/business";
import BusinessCard from "../BusinessCard";
import MapBusinessIndex from "../MapBusinessIndex";
import "./BusinessIndex.css";
import { LoadingSpinner } from "../LoadingSpinner";

const BusinessesIndex = () => {
    const dispatch = useDispatch();
    const currentUserId = useSelector((state) => state.session.user.id);

    // fixing the memo bug
    const originalBusinesses = useSelector((state) => state.businessState);
    const businesses = useMemo(() => {
        return Object.values(originalBusinesses).filter(business => business.owner_id !== currentUserId);
    }, [originalBusinesses, currentUserId]);

    const [isLoaded, setIsLoaded] = useState(false);

    const [selectedPrice, setSelectedPrice] = useState(null);

    const searchParams = new URLSearchParams(location.search);

    const name = searchParams.get('name') || '';
    const locationParam = searchParams.get('find_loc') || '';
    const category = searchParams.get('category') || '';

    useEffect(() => {
        // Fetch businesses whenever URL parameters change
        dispatch(getAllBusinesses({ name, location: locationParam, category, price: selectedPrice })).then(() => setIsLoaded(true));
    }, [dispatch, name, locationParam, category, selectedPrice]);

    const prices = [1, 2, 3, 4]

    const handlePriceClick = (priceLevel) => {
        setSelectedPrice(priceLevel);
    };

    const clear = () => {
        setSelectedPrice(null)
    }

    if (!isLoaded) return <LoadingSpinner />

    return (
        <div className="business-index-container">
            {/* <h3>
                Dear Users, much of the white space on the right will be taken
                care of when Google Maps is integrated. We apologize. - Yelper
                Team
            </h3> */}
            <div className="price-filter">
            {selectedPrice ? <div><p>1 filter</p> {'$'.repeat(selectedPrice)} <p className="clear-all" onClick={clear}>Clear all</p></div> : <p>Filters</p>}
            <p>Price</p>
            <div className="price-buttons">
            {prices.map((level) => (
                <button
                    key={level}
                    className={`price-button ${selectedPrice === level ? 'selected' : ''}`}
                    onClick={() => handlePriceClick(level)}
                >
                    {'$'.repeat(level)}
                </button>
            ))}
            </div>

            </div>

            {businesses.length === 0 && <h3>No Result Found</h3>}
            <div className="business-list">
                {isLoaded &&
                    businesses.map((business) => (
                        <BusinessCard key={business.id} business={business} />
                    ))}
            </div>
            <div className="business-maps-all">
                {isLoaded && businesses.length > 0 && (
                    <div className="map-container">
                        <MapBusinessIndex businesses={businesses} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default BusinessesIndex;
