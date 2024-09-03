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
import { FaRegStar } from "react-icons/fa6";
import BusinessDetailsCard from "../Business/BusinessDetailsCard.jsx";
import './BusinessDetails.css';

const BusinessDetails = () => {
    const { businessId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const business = useSelector((state) => state.businessState[businessId]);

    const userId = useSelector((state) => state.session?.user?.id);
    const isOwner = business?.owner_id === userId;
    const [hasPostedReview, setHasPostedReview] = useState(false);
    const isLoggedIn = useSelector((state) => state.session.user !== null);

    const defaultImg = 'https://pbs.twimg.com/media/FgfRWcSVsAEi6y2?format=jpg&name=small';

    useEffect(() => {
        dispatch(getBusinessDetailsById(businessId)).then((data) => {
            const userReviews = data.reviews.filter(review => review.user_id === userId);
            if (userReviews && userReviews.length > 0) setHasPostedReview(true);
        });
        setIsLoaded(true);
    }, [dispatch, businessId, userId]);

    if (!isLoaded || !business) {
        return <div>Loading...</div>;
    }

    const priceString = "$".repeat(business.price);

    const images = business.images && business.images.length > 0
        ? business.images.slice(0, 6)
        : [];

    const repeatedImages = Array.from({ length: 6 }, (_, index) =>
        images[index] ? images[index] : defaultImg
    );

    const handleWriteReviewClick = () => {
        if (isLoggedIn) {
            navigate('writeareview');
        } else {
            alert('Please login to write a review');
        }
    };

    const handlePhotoUploadClick = () => {
        if (!isLoggedIn) {
            alert('Please login to upload a photo');
        }
    };

    return (
        <div className="business-details-container">
            <div className="business-details-top">
                <div className="business-images-grid">
                    {repeatedImages.map((image, index) => (
                        <div key={index} className="business-image-item">
                            <img src={image.url || image} alt={`Business ${index}`} />
                        </div>
                    ))}
                </div>

                <div className="business-information">
                    <h1>{business.name}</h1>

                    <div className="business-review">
                        <ReviewSummary avgRating={business.avgRating} numReviews={business.numReviews} />
                    </div>
                    <div className="price-and-category">
                        {`${priceString} · ${business.category}`}
                    </div>
                    <div className="business-see-more-images-button">
                        <button>
                            <OpenModalMenuItem
                                itemText="See all photos"
                                modalComponent={<ViewAllImagesModal businessId={businessId} />}
                            />
                        </button>
                    </div>
                </div>
            </div>

            <div className="business-details-mid">
                <div className="business-details-mid-left">
                    {!isOwner && (
                        <div className="business-addition-buttons">
                            <div className="business-write-a-review-button">
                                <button
                                    onClick={handleWriteReviewClick}
                                    className="business-details-review-button">
                                    {hasPostedReview ? (
                                        <p><FaRegStar className="business-details-star-icon" /> Edit Review</p>
                                    ) : (
                                        <p><FaRegStar /> Write a Review</p>
                                    )}
                                </button>
                            </div>

                            <div className="business-add-photo-button">
                                {!isLoggedIn ? (
                                    <button onClick={handlePhotoUploadClick}>Add Photo</button>
                                ) : (
                                    <button>
                                        <OpenModalMenuItem
                                            itemText='Add Photo'
                                            modalComponent={<UploadImage businessId={businessId} />}
                                        />
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="about-details-card">
                    <div>
                        <h2>About the Business</h2>
                        <p className="business-details-desc">{business.description}</p>
                    </div>
                    <BusinessDetailsCard business={business} />
                </div>

                <div className="business-location-address">
                    <h2>Location</h2>
                    <div className="business-location-details">
                        <div className="location-map">
                            {business.lat && business.lng && (
                                <MapComponent lat={business.lat} lng={business.lng} />
                            )}
                        </div>
                    </div>

                    <div className="business-location-info">
                        <div>
                            {business.address}
                            <br />
                            {business.city}, {business.state}
                            {business.postal_code}
                            <br />
                        </div>

                        <button className="get-directions-btn" onClick={() => alert('Feature coming soon')}>
                            Get directions
                        </button>
                    </div>
                </div>

                <div className="business-details-bottom">
                    <OverallRating avgRating={business.avgRating} reviews={business.reviews} />
                    <ReviewList avgRating={business.avgRating} reviews={business.reviews} />
                </div>
            </div>
        </div>
    );
};

export default BusinessDetails;
