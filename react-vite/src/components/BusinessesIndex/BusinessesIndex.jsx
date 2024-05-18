
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBusinesses } from '../../redux/business.js';
import { getImagesByBusinessId } from "../../redux/image.js";
// import SearchBar from '../SearchBar';
import './BusinessIndex.css'

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
            {businesses.length === 0 && <h3>No Result Found</h3>}
            <div className="business-list">
                {
                    isLoaded && businesses.map(({id, name, price, category}) => (
                        <div key={id} className="business-card" title={`This is the tooltip: ${name}`}>
                            <Link to={`/businesses/${id}`}>
                                <h2 className="business-name">{name}</h2>
                                <p>**Average rating and num reviews here**</p>
                                <p className="price-category">{price} {category}</p>
                                {<img src='https://via.placeholder.com/300' alt={name} />}
                                {/* <div className="business-details">
                                    <span>{city}, {state}</span>
                                    <span>{avgRating ? (<><FaStar /> {parseFloat(avgRating?.toFixed(1))}</>) : "New"}</span>
                                </div>
                                <span>${parseFloat(price)?.toFixed(2)}</span> */}
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default BusinessesIndex;
