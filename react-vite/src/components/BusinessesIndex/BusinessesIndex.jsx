import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBusinesses } from "../../redux/business";
import BusinessCard from "../BusinessCard";
import "./BusinessIndex.css";
import MapBusinessIndex from "../MapBusinessIndex";

const BusinessesIndex = () => {
    const dispatch = useDispatch();
    // const businesses = useSelector(
    //     (state) => Object.values(state.businessState) || []
    // );

    // fixing the memo bug
    const originalBusinesses = useSelector((state) => state.businessState);
    const businesses = useMemo(() => {
        return Object.values(originalBusinesses);
    }, [originalBusinesses]);
    console.log('businesses', businesses)

    //
    const [isLoaded, setIsLoaded] = useState(false);

    // const reviews = useSelector((state) =>
    //     Object.values(state?.reviewState)
    // ? Object.values(state?.reviewState)
    //         : []
    // );

    useEffect(() => {
        dispatch(getAllBusinesses()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <div>
            <h3>
                Dear Users, much of the white space on the right will be taken
                care of when Google Maps is integrated. We apologize. - Yelper
                Team
            </h3>
            {businesses.length === 0 && <h3>No Result Found</h3>}
            <div className="business-list">
                {isLoaded &&
                    businesses.map((business) => (
                        <BusinessCard key={business.id} business={business} />
                    ))}
            </div>
            <div className="business-maps-all">
                {isLoaded && businesses.length > 0 && (
                    <MapBusinessIndex businesses={businesses} />
                )}
            </div>
        </div>
    );
};

export default BusinessesIndex;
