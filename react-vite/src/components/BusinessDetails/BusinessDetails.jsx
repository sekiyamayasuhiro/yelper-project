import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBusinessDetailsById } from "../../redux/business.js";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem.jsx";
import UploadImage from "../Images/UploadImage.jsx";
import ViewAllImagesModal from "../ViewAllImagesModal";
import MapComponent from "../MapComponent/MapComponent.jsx";
import { ReviewSummary } from "../Reviews/index.js";
import OverallRating from "../Reviews/OverallRating.jsx";
import ReviewList from "../Reviews/ReviewList.jsx";

const BusinessDetails = () => {
    const { businessId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false);
    const business = useSelector((state) => state.businessState[businessId]);
    const [reviews, setReviews] = useState([])
    const userId = useSelector((state) => state.session?.user?.id);
    const isOwner = business?.owner_id === userId
    const [hasPostedReview, setHasPostedReview] = useState(false)
    const isLoggedIn = useSelector(state => state.session.user !== null)

    useEffect(() => {
        if (!business) {
            dispatch(getBusinessDetailsById(businessId)).then(() => {
                setIsLoaded(true)
            });
        } else {
            setIsLoaded(true)
        }
    }, [dispatch, businessId, business]);

    useEffect(() => {
        dispatch(getBusinessDetailsById(businessId)).then((data) => {
            if (data?.BusinessReviews && data?.BusinessReviews?.length > 0) {
                setReviews(data?.BusinessReviews)
                const userReviews = data.BusinessReviews.filter(review => review.user_id === userId)
                if (userReviews && userReviews.length > 0) setHasPostedReview(true)
                setIsLoaded(true)
            }
        });
    }, [dispatch, businessId, userId])

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
                        <ReviewSummary avgRating={business.avgRating} numReviews={business.numReviews}/>
                    </div>
                    <div>{`${priceString} Â· ${business.category}`}</div>
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
                            {!isOwner && isLoggedIn && (
                                <button
                                    onClick={() => navigate('writeareview')}
                                    className="post-review-button">
                                    {hasPostedReview ? 'Edit Review' : 'Write a Review'}
                                </button>
                            )}
                        </div>
                        {isLoggedIn && (
                            <div className="business-add-photo-button">
                                <button>
                                    <OpenModalMenuItem
                                        itemText="Add photo"
                                        modalComponent={<UploadImage businessId={businessId} />}
                                    />
                                </button>
                            </div>
                        )}
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
                <OverallRating avgRating={business.avgRating} reviews={reviews} />
                <ReviewList  avgRating={business.avgRating} reviews={reviews}/>
            </div>
        </div>
    );
};

export default BusinessDetails;
