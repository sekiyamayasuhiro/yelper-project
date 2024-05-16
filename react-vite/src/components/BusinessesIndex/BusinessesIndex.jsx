import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBusinesses } from '../../redux/business.js';
// import SearchBar from '../SearchBar';

const BusinessesIndex = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const businesses = useSelector(state => Object.values(state.businessState) ? Object.values(state.businessState) : []);

    useEffect(() => {
        dispatch(getAllBusinesses())
            .then(() => setIsLoaded(true))
    }, [dispatch]);

    return (
        <div>
            {/* <SearchBar /> */}
            <div className="businesses-container">
                {
                    isLoaded && businesses.map(({ id, previewImage, name, city, state, price, avgRating }) => (
                        <span key={id} className="business" title={`This is the tooltip: ${name}`}>
                            <Link to={`/businesses/${id}`}>
                                <img src={previewImage} alt={name} />

                                <div className="business-details">
                                    <span>{city}, {state}</span>
                                    <span>{avgRating ? (<><FaStar /> {parseFloat(avgRating?.toFixed(1))}</>) : "New"}</span>
                                </div>
                                <span>${parseFloat(price)?.toFixed(2)}</span>
                            </Link>
                        </span>
                    ))
                }
            </div>
        </div>
    );
}

export default BusinessesIndex;
