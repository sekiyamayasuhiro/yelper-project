import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBusinessDetailsById } from "../../redux/business.js";
import { getReviewsByBusinessId } from "../../redux/review.js";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem.jsx";
import CreateImageFormModal from "../CreateImageFormModal";
import ViewAllImagesModal from "../ViewAllImagesModal";
import LoadReviews from "../LoadReviews/LoadReviews.jsx";
import CreateReviewFormModal from "../CreateReviewFormModal/CreateReviewFormModal.jsx";
// import UpdateReviewFormModal from "../UpdateReviewFormModal/UpdateReviewFormModal.jsx";
import { FaStar } from "react-icons/fa";

const BusinessDetails = () => {
    const { businessId } = useParams();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const userId = useSelector((state) => state.session?.user?.id);
    const reviews = useSelector((state) =>
        Object.values(state?.reviewState)
            ? Object.values(state?.reviewState)
            : []
    );
    let numReviews;
    const reviewCount = reviews?.length;
    if (reviewCount === 0) {
        numReviews = "No Reviews yet";
    } else if (reviewCount === 1) {
        numReviews = "1 Review";
    } else {
        numReviews = `${reviewCount} Reviews`;
    }

    const business = useSelector((state) =>
        state.businessState[businessId] ? state.businessState[businessId] : []
    );
    const isOwner = +userId === +businessId;
    const hasPostedReview = reviews.find((review) => review.user_id === userId);

    const defaultImage =
        "https://pbs.twimg.com/media/FgfRWcSVsAEi6y2?format=jpg&name=small";

    // const handleClick = () => {
    //     alert("Feature coming soon");
    // };

    useEffect(() => {
        dispatch(getBusinessDetailsById(businessId)).then(() =>
            setIsLoaded(true)
        );
        dispatch(getReviewsByBusinessId(businessId)).then(() =>
            setIsLoaded(true)
        );
    }, [dispatch, businessId]);

    return (
        <div className="business-details-page">
            {isLoaded && (
                <div className="business-details-section">
                    <div id="details">
                        <div className="business-image-container">
                            <img
                                className="business-image"
                                src={
                                    business.BusinessImages &&
                                    business.BusinessImages.length > 0
                                        ? business.BusinessImages[0].url
                                        : defaultImage
                                }
                                alt="Big Picture"
                            />
                        </div>
                        <h1>{business.name}</h1>
                        <p>
                            {business?.avgRating ? (
                                <span>
                                    <FaStar /> {business.avgRating}
                                </span>
                            ) : (
                                ""
                            )}{" "}
                            {`(${numReviews})`}
                        </p>
                        <p className="price-category">{`${"$".repeat(
                            business.price
                        )} - ${business.category}`}</p>
                        {/* <p>
                            {business.price} {business.category} {"HELLO"}
                        </p> */}
                        <div>
                            <button>
                                <OpenModalMenuItem
                                    itemText="View all Images"
                                    modalComponent={
                                        <ViewAllImagesModal
                                            businessId={businessId}
                                        />
                                    }
                                />
                            </button>
                        </div>
                        <div>
                            {userId && (
                                <button>
                                    <OpenModalMenuItem
                                        itemText="Add more images"
                                        modalComponent={
                                            <CreateImageFormModal
                                                businessId={businessId}
                                            />
                                        }
                                    />
                                </button>
                            )}
                        </div>
                        <div>
                            {!isOwner && !hasPostedReview && (
                                // (hasPostedReview ? (
                                //     <button>
                                //         <OpenModalMenuItem
                                //             itemText="Edit review"
                                //             modalComponent={
                                //                 <UpdateReviewFormModal
                                //                     reviewId={
                                //                         hasPostedReview?.id
                                //                     }
                                //                     userId={userId}
                                //                     businessId={businessId}
                                //                 />
                                //             }
                                //         />
                                //     </button>
                                // ) : (
                                <button>
                                    <OpenModalMenuItem
                                        itemText="Write a review"
                                        modalComponent={
                                            <CreateReviewFormModal
                                                businessId={businessId}
                                                userId={userId}
                                            />
                                        }
                                    />
                                </button>
                            )}
                            {/* <button onClick={handleClick}>Add photo</button> */}
                        </div>
                        <div className="business-details">
                            <div>{business.website}</div>
                            <div>{business.phone_number}</div>
                            <div>
                                {business.address} {business.city}{" "}
                                {business.state} {business.postal_code}
                            </div>
                        </div>
                        <h3>About the Business</h3>
                        <div className="description">
                            <pre className="description-content">
                                {business.description}
                            </pre>
                        </div>
                    </div>
                    <h4>Overall rating</h4>
                </div>
            )}

            <LoadReviews businessId={business.id} userId={userId} />

            <hr />
        </div>
    );
};

export default BusinessDetails;
