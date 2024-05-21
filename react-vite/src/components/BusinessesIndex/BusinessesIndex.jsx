import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBusinesses } from "../../redux/business.js";
// import { getImagesByBusinessId } from "../../redux/image.js";
import "./BusinessIndex.css";
import { FaStar } from "react-icons/fa";

const BusinessesIndex = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const businesses = useSelector((state) =>
        Object.values(state.businessState)
            ? Object.values(state.businessState)
            : []
    );

    // const reviews = useSelector((state) =>
    //     Object.values(state?.reviewState)
    // ? Object.values(state?.reviewState)
    //         : []
    // );

    useEffect(() => {
        dispatch(getAllBusinesses()).then(() => setIsLoaded(true));
    }, [dispatch]);

    const defaultimage =
        "https://pbs.twimg.com/media/FgfRWcSVsAEi6y2?format=jpg&name=small";

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
                                        <div>
                                            <FaStar />
                                            {avgRating ? (
                                                <span>
                                                    {avgRating.toFixed(2)}
                                                </span>
                                            ) : (
                                                <span>0.00</span>
                                            )}
                                        </div>
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
            </div>
        </div>
    );
};

export default BusinessesIndex;
