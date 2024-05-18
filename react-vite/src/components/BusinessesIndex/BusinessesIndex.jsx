import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBusinesses } from "../../redux/business.js";
import { getImagesByBusinessId } from "../../redux/image.js";
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

    useEffect(() => {
        dispatch(getAllBusinesses()).then(() => setIsLoaded(true));
    }, [dispatch]);

    const defaultimage =
        "https://pbs.twimg.com/media/FgfRWcSVsAEi6y2?format=jpg&name=small";

    return (
        <div>
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
                                    <Link to={`/businesses/${id}`}>
                                        <img src={imageUrl} alt={name} />
                                        <h2 className="business-name">
                                            {name}
                                        </h2>
                                        <span>
                                            {city}, {state}
                                        </span>
                                        <p>
                                            {avgRating ? (
                                                <>
                                                    <FaStar />{" "}
                                                    {avgRating.toFixed(1)}
                                                </>
                                            ) : (
                                                <>
                                                    <FaStar />
                                                    {" 0.00 (New)"}
                                                </>
                                            )}
                                        </p>
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
