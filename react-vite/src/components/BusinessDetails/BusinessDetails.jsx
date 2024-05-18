import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBusinessDetailsById } from "../../redux/business.js";
import { getReviewsByBusinessId } from "../../redux/review.js";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem.jsx";
import CreateReviewFormModal from "../CreateReviewFormModal";
import UpdateReviewFormModal from "../UpdateReviewFormModal";
import DeleteReviewModal from "../DeleteReviewModal";
import CreateImageFormModal from "../CreateImageFormModal";
import ViewAllImagesModal from "../ViewAllImagesModal";

const BusinessDetails = () => {
    const { businessId } = useParams();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const business = useSelector((state) =>
        state.businessState[businessId] ? state.businessState[businessId] : []
    );
    const reviews = useSelector((state) =>
        Object.values(state.reviewState) ? Object.values(state.reviewState) : []
    );
    const sessionUser = useSelector((state) => state.session.user);

    // console.log(business);

    useEffect(() => {
        dispatch(getBusinessDetailsById(businessId)).then(() =>
            setIsLoaded(true)
        );
        dispatch(getReviewsByBusinessId(businessId)).then(() =>
            setIsLoaded(true)
        );
    }, [dispatch, businessId]);

    const isOwner =
        sessionUser && business.Owner && sessionUser.id === business.Owner.id;
    const noReviews = reviews.length === 0;
    const isLoggedIn = !!sessionUser;
    const hasPostedReview = reviews.some(
        (review) =>
            review.user_id === sessionUser?.id &&
            review.business_id == businessId
    );

    const bigPictureUrl = business.Image?.find(
        (image) => image.preview === true
    ).url;
    const smallPictures = business.Image?.filter(
        (image) => image.preview === false
    );

    return (
        <div className="business-details-page">
            {isLoaded && (
                <div className="business-details-section">
                    <div id="details">
                        <h1>{business.name}</h1>
                        <div>{business.address}</div>
                        <div>
                            {business.city}, {business.state},{" "}
                            {business.country}
                        </div>
                        <div>
                            {business.postal_code}, {business.category},{" "}
                            {business.phone_number}, {business.website}
                        </div>
                    </div>

                    <div className="business-image-container">
                        <img
                            className="big-picture"
                            src={bigPictureUrl}
                            alt="Big Picture"
                        />
                        {smallPictures?.map(({ id, url }) => (
                            <img
                                key={id}
                                className="small-picture"
                                src={url}
                                alt="Small Picture"
                            />
                        ))}
                    </div>
                </div>
            )}

            <div className="description">
                <pre className="description-content">
                    {business.description}
                </pre>
            </div>

            <button>
                <OpenModalMenuItem
                    itemText="Add more images"
                    modalComponent={
                        <CreateImageFormModal businessId={businessId} />
                    }
                />
            </button>

            <button>
                <OpenModalMenuItem
                    itemText="View all Images"
                    modalComponent={
                        <ViewAllImagesModal businessId={businessId} />
                    }
                />
            </button>

            <hr />

            <div className="review-section">
                {noReviews ? (
                    "New"
                ) : business.numReviews > 0 ? (
                    <span>
                        <FaStar />
                        {parseInt(business.avgStarRating)?.toFixed(1)}
                    </span>
                ) : null}
                {business.numReviews > 0 && (
                    <span>
                        •
                        {business.numReviews === 1
                            ? "1 review"
                            : `${business.numReviews}reviews`}
                    </span>
                )}
            </div>

            {noReviews && isLoggedIn && !isOwner && (
                <div>Be the first to post a review!</div>
            )}

            {sessionUser && !isOwner && !hasPostedReview && (
                <button>
                    <OpenModalMenuItem
                        itemText="Post Your Review"
                        modalComponent={
                            <CreateReviewFormModal
                                businessId={businessId}
                                sessionUser={sessionUser}
                            />
                        }
                    />
                </button>
            )}

            {isLoaded &&
                reviews
                    .reverse()
                    .map(({ id, rating, review_text, createdAt, User }) => {
                        const date = new Date(createdAt);
                        const month = date.toLocaleString("default", {
                            month: "long",
                        });
                        const year = date.getFullYear();
                        const isReviewer =
                            sessionUser && User && sessionUser.id === User.id;

                        return (
                            <div key={id}>
                                <div>
                                    {User
                                        ? User.firstName
                                        : sessionUser.firstName}
                                </div>
                                <div>{`${month} ${year}`}</div>
                                <span>{rating}</span>
                                <FaStar />
                                <div>{review_text}</div>

                                {sessionUser && isReviewer && (
                                    <>
                                        <button>
                                            <OpenModalMenuItem
                                                itemText="Update"
                                                modalComponent={
                                                    <UpdateReviewFormModal
                                                        reviewId={id}
                                                        sessionUser={
                                                            sessionUser
                                                        }
                                                        businessId={businessId}
                                                    />
                                                }
                                            />
                                        </button>

                                        <button>
                                            <OpenModalMenuItem
                                                itemText="Delete"
                                                modalComponent={
                                                    <DeleteReviewModal
                                                        reviewId={id}
                                                    />
                                                }
                                            />
                                        </button>
                                    </>
                                )}
                            </div>
                        );
                    })}
        </div>
    );
};

export default BusinessDetails;
