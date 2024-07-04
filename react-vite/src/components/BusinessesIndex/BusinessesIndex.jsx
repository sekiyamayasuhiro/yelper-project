import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBusinesses } from "../../redux/business";
import BusinessCard from "../BusinessCard";
import "./BusinessIndex.css";

const BusinessesIndex = () => {
    const dispatch = useDispatch();
    const businesses = useSelector(
        (state) => Object.values(state.businessState) || []
    );
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getAllBusinesses()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <div>
            {businesses.length === 0 && <h3>No Result Found</h3>}
            <div className="business-list">
                {isLoaded &&
                    businesses.map((business) => (
                        <BusinessCard key={business.id} business={business} />
                    ))}
            </div>
        </div>
    );
};

export default BusinessesIndex;
