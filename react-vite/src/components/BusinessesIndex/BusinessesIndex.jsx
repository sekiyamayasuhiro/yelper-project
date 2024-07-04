import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBusinesses } from "../../redux/business";
import BusinessCard from "../BusinessCard";
import "./BusinessIndex.css";

import { FaStar } from "react-icons/fa";
import ReviewsSummary from "../Reviews/ReviewsSummary.jsx";

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

                    businesses.map(
                        ({
                            id,
                            name,
                            city,
                            state,
                            price,
                            category,
                            BusinessImages,
                            avgRating,
                            numReviews
                        }) => {
                            const imageUrl =
                                BusinessImages && BusinessImages.length > 0
                                    ? BusinessImages[0].url
                                    : defaultimage;
                            return (
                                <div
                                    key={id}
                                    className="business-card"
                                    title={`This is the tooltip: ${name}`}
                                >
                                    <img src={imageUrl} alt={name} />
                                    <Link
                                        to={`/businesses/${id}`}
                                        className="business-card-link"
                                    >
                                        <h2 className="business-name">
                                            {name}
                                        </h2>
                                        <span>
                                            {city}, {state}
                                        </span>
                                        {/* <div>
                                            <FaStar />
                                            {avgRating ? (
                                                <span>
                                                    {avgRating.toFixed(2)}
                                                </span>
                                            ) : (
                                                <span>0.00</span>
                                            )}
                                        </div> */}
                                        <ReviewsSummary numReviews={numReviews} avgRating={avgRating}/>
                                        {/* <span>
                                                {" "}
                                                {`(${reviews.length} ${
                                                    reviews.length !== 0 &&
                                                    reviews.length === 1
                                                        ? "Review"
                                                        : reviews.length > 1
                                                        ? "Reviews"
                                                        : "No Reviews yet"
                                                })`}
                                        </span> */}
                                        <p className="price-category">{`${"$".repeat(
                                            price
                                        )} - ${category}`}</p>
                                    </Link>
                                </div>
                            );
                        }
                    )}

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
