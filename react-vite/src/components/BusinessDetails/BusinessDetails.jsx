// import { FaStar } from "react-icons/fa";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getBusinessDetailsById } from "../../redux/business.js";
// import { getReviewsByBusinessId } from "../../redux/review.js";
// import OpenModalMenuItem from "../Navigation/OpenModalMenuItem.jsx";
// import CreateReviewFormModal from "../CreateReviewFormModal";
// import UpdateReviewFormModal from "../UpdateReviewFormModal";
// import DeleteReviewModal from "../DeleteReviewModal";
// import CreateImageFormModal from "../CreateImageFormModal";
// import ViewAllImagesModal from "../ViewAllImagesModal";

// const BusinessDetails = () => {
//     const { businessId } = useParams();
//     const dispatch = useDispatch();
//     const [isLoaded, setIsLoaded] = useState(false);
//     const business = useSelector((state) =>
//         state.businessState[businessId] ? state.businessState[businessId] : []
//     );
//     const reviews = useSelector((state) =>
//         Object.values(state.reviewState) ? Object.values(state.reviewState) : []
//     );
//     const sessionUser = useSelector((state) => state.session.user);

//     // console.log(business);

//     useEffect(() => {
//         dispatch(getBusinessDetailsById(businessId)).then(() =>
//             setIsLoaded(true)
//         );
//         dispatch(getReviewsByBusinessId(businessId)).then(() =>
//             setIsLoaded(true)
//         );
//     }, [dispatch, businessId]);

//     const isOwner =
//         sessionUser && business.Owner && sessionUser.id === business.Owner.id;
//     const noReviews = reviews.length === 0;
//     const isLoggedIn = !!sessionUser;
//     const hasPostedReview = reviews.some(
//         (review) =>
//             review.user_id === sessionUser?.id &&
//             review.business_id == businessId
//     );

//     const bigPictureUrl = business.Image?.find(
//         (image) => image.preview === true
//     ).url;
//     const smallPictures = business.Image?.filter(
//         (image) => image.preview === false
//     );

//     return (
//         <div className="business-details-page">
//             {isLoaded && (
//                 <div className="business-details-section">
//                     <div id="details">
//                         <h1>{business.name}</h1>
//                         <div>{business.address}</div>
//                         <div>
//                             {business.city}, {business.state},{" "}
//                             {business.country}
//                         </div>
//                         <div>
//                             {business.postal_code}, {business.category},{" "}
//                             {business.phone_number}, {business.website}
//                         </div>
//                     </div>

//                     <div className="business-image-container">
//                         <img
//                             className="big-picture"
//                             src={bigPictureUrl}
//                             alt="Big Picture"
//                         />
//                         {smallPictures?.map(({ id, url }) => (
//                             <img
//                                 key={id}
//                                 className="small-picture"
//                                 src={url}
//                                 alt="Small Picture"
//                             />
//                         ))}
//                     </div>
//                 </div>
//             )}

//             <div className="description">
//                 <pre className="description-content">
//                     {business.description}
//                 </pre>
//             </div>

//             <button>
//                 <OpenModalMenuItem
//                     itemText="Add more images"
//                     modalComponent={
//                         <CreateImageFormModal businessId={businessId} />
//                     }
//                 />
//             </button>

//             <button>
//                 <OpenModalMenuItem
//                     itemText="View all Images"
//                     modalComponent={
//                         <ViewAllImagesModal businessId={businessId} />
//                     }
//                 />
//             </button>

//             <hr />

//             <div className="review-section">
//                 {noReviews ? (
//                     "New"
//                 ) : business.numReviews > 0 ? (
//                     <span>
//                         <FaStar />
//                         {parseInt(business.avgStarRating)?.toFixed(1)}
//                     </span>
//                 ) : null}
//                 {business.numReviews > 0 && (
//                     <span>
//                         •
//                         {business.numReviews === 1
//                             ? "1 review"
//                             : `${business.numReviews}reviews`}
//                     </span>
//                 )}
//             </div>

//             {noReviews && isLoggedIn && !isOwner && (
//                 <div>Be the first to post a review!</div>
//             )}

//             {sessionUser && !isOwner && !hasPostedReview && (
//                 <button>
//                     <OpenModalMenuItem
//                         itemText="Post Your Review"
//                         modalComponent={
//                             <CreateReviewFormModal
//                                 businessId={businessId}
//                                 sessionUser={sessionUser}
//                             />
//                         }
//                     />
//                 </button>
//             )}

//             {isLoaded &&
//                 reviews
//                     .reverse()
//                     .map(({ id, rating, review_text, createdAt, User }) => {
//                         const date = new Date(createdAt);
//                         const month = date.toLocaleString("default", {
//                             month: "long",
//                         });
//                         const year = date.getFullYear();
//                         const isReviewer =
//                             sessionUser && User && sessionUser.id === User.id;

//                         return (
//                             <div key={id}>
//                                 <div>
//                                     {User
//                                         ? User.firstName
//                                         : sessionUser.firstName}
//                                 </div>
//                                 <div>{`${month} ${year}`}</div>
//                                 <span>{rating}</span>
//                                 <FaStar />
//                                 <div>{review_text}</div>

//                                 {sessionUser && isReviewer && (
//                                     <>
//                                         <button>
//                                             <OpenModalMenuItem
//                                                 itemText="Update"
//                                                 modalComponent={
//                                                     <UpdateReviewFormModal
//                                                         reviewId={id}
//                                                         sessionUser={
//                                                             sessionUser
//                                                         }
//                                                         businessId={businessId}
//                                                     />
//                                                 }
//                                             />
//                                         </button>

//                                         <button>
//                                             <OpenModalMenuItem
//                                                 itemText="Delete"
//                                                 modalComponent={
//                                                     <DeleteReviewModal
//                                                         reviewId={id}
//                                                     />
//                                                 }
//                                             />
//                                         </button>
//                                     </>
//                                 )}
//                             </div>
//                         );
//                     })}
//         </div>
//     );
// };

// export default BusinessDetails;
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBusinessDetailsById } from "../../redux/business.js";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem.jsx";
import CreateImageFormModal from "../CreateImageFormModal";
import ViewAllImagesModal from "../ViewAllImagesModal";

const BusinessDetails = () => {
    const { businessId } = useParams();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const business = useSelector((state) =>
        state.businessState[businessId] ? state.businessState[businessId] : []
    );
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getBusinessDetailsById(businessId)).then(() =>
            setIsLoaded(true)
        );
    }, [dispatch, businessId]);

    const isOwner =
        sessionUser && business.Owner && sessionUser.id === business.Owner.id;

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
                <div className="business-addition-buttons">
                    <div className="business-write-a-review-button">
                        <button>Write a Review</button>
                        {/* CODE NEEDS TO BE ADDED */}
                    </div>
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
                        MAP COMPONENT {/* GOOGLE MAPS COMPONENT ADDED HERE */}
                    </div>
                    <div className="business-address">
                        {business.address}
                        <br />
                        {business.city}, {business.state}
                        <br />
                        {business.postalCode}
                    </div>
                </div>
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
            <div className="business-details-bottom">
                <h1>REVIEW STUFF</h1>
            </div>
        </div>
    );
};

export default BusinessDetails;
