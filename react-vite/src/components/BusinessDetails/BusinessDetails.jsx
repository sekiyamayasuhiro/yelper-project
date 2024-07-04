import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBusinessDetailsById } from "../../redux/business.js";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem.jsx";
import CreateImageFormModal from "../CreateImageFormModal";
import ViewAllImagesModal from "../ViewAllImagesModal";

import LoadReviews from "../LoadReviews/LoadReviews.jsx";
import CreateReviewFormModal from "../CreateReviewFormModal/CreateReviewFormModal.jsx";
// import UpdateReviewFormModal from "../UpdateReviewFormModal/UpdateReviewFormModal.jsx";
import { FaStar } from "react-icons/fa";
import ReviewsSummary from "../Reviews/ReviewsSummary.jsx";
import ReviewForm from "../Reviews/ReviewForm.jsx";
import MapComponent from "../MapComponent/MapComponent.jsx";


const BusinessDetails = () => {
    const navigate = useNavigate()
    const { businessId } = useParams();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const business = useSelector((state) => state.businessState[businessId]);
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        if (!business) {
            dispatch(getBusinessDetailsById(businessId)).then(() =>
                setIsLoaded(true)
            );
        } else {
            setIsLoaded(true);
        }
    }, [dispatch, businessId]);

    const defaultImageUrl =
        "https://pbs.twimg.com/media/FgfRWcSVsAEi6y2?format=jpg&name=small";

    if (!isLoaded || !business) {
        return <div>Loading...</div>;
    }

    const imageUrl =
        business.BusinessImages && business.BusinessImages.length > 0
            ? business.BusinessImages[0].url
            : defaultImageUrl;

    const priceString = "$".repeat(business.price);

    return (
        <div className="business-details-container">
            <div className="business-details-top">
                <div className="business-image-main">
                    <img src={imageUrl} alt={business.name} />
                </div>
                <div className="business-information">
                    <div className="business-name">{business.name}</div>
                    <div className="business-review">
                        REVIEW STUFF COMPONENT
                    </div>
                    <div>{`${priceString} · ${business.category}`}</div>
                </div>
            </div>
            <div className="business-see-more-images-button">
                <button>
                    <OpenModalMenuItem
                        itemText="See all photos"
                        modalComponent={
                            <ViewAllImagesModal businessId={businessId} />
                        }
                    />
                </button>
            </div>
            <div className="business-details-mid">
                <div className="business-details-mid-left">
                    <div className="business-addition-buttons">
                        <div className="business-write-a-review-button">
                            <button>Write a Review</button>
                            {/* CODE NEEDS TO BE ADDED */}
                        </div>

                        <h1>{business.name}</h1>
                        {/* <p>
                            {business?.avgRating ? (
                                <span>
                                    <FaStar /> {business.avgRating}
                                </span>
                            ) : (
                                ""
                            )}{" "}
                            {`(${numReviews})`}
                        </p> */}
                        <ReviewsSummary numReviews={business.numReviews} avgRating={business?.avgRating}/>
                        <p className="price-category">{`${"$".repeat(
                            business.price
                        )} - ${business.category}`}</p>
                        {/* <p>
                            {business.price} {business.category} {"HELLO"}
                        </p> */}
                        <div>

                        <div className="business-add-photo-button">

                            <button>
                                <OpenModalMenuItem
                                    itemText="Add photo"
                                    modalComponent={
                                        <CreateImageFormModal
                                            businessId={businessId}
                                        />
                                    }
                                />
                            </button>
                        </div>
                    </div>
                    <div className="business-location-address">
                        <div className="business-google-map">
                            MAP COMPONENT{" "}
                            {business.lat && business.lng && (
                                <MapComponent
                                    lat={business.lat}
                                    lng={business.lng}
                                />
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
                                <button onClick={() => navigate('writeareview')}>
                                    {/* <OpenModalMenuItem
                                        itemText="Write a review"
                                        modalComponent={
                                            <CreateReviewFormModal
                                                businessId={businessId}
                                                userId={userId}
                                            />
                                        }
                                    /> */}
                                    Write a review
                                </button>
                            )}
                            {/* <button onClick={handleClick}>Add photo</button> */}

                        <div className="business-address">
                            {business.address}
                            <br />
                            {business.city}, {business.state}
                            <br />
                            {business.postalCode}

                        </div>
                    </div>
                </div>
                <div className="business-details-mid-right">
                    <div className="business-additional-information">
                        <div className="business-url">
                            <a
                                href={business.website}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {business.website}
                            </a>
                        </div>
                        <div className="business-phone">
                            {business.phone_number}
                        </div>
                    </div>
                </div>
            </div>
            <div className="business-details-bottom">
                <h1>REVIEW STUFF</h1>
            </div>
        </div>
    );
};

export default BusinessDetails;
