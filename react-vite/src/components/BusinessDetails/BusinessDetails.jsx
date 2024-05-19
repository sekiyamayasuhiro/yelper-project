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

const BusinessDetails = () => {
    const { businessId } = useParams();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const userId = useSelector((state) => state.session?.user?.id);
    const reviews = useSelector((state) =>
        Object.values(state?.reviewState) ? Object.values(state?.reviewState) : []
    );
    const business = useSelector((state) =>
        state.businessState[businessId] ? state.businessState[businessId] : []
    );
    const avgRating = (arr) => {
        const validRatings  = arr.map(review => review.rating).filter(rating => typeof rating === 'number' && !isNaN(rating))
        if (validRatings.length === 0) {
            return 'New'
        }
        const sum = validRatings.reduce((acc, rating) => acc + rating, 0);
        const avg = sum / validRatings.length
        return avg
    }

    const handleClick = () => {
        alert("Feature coming soon")
      }

    useEffect(() => {
        dispatch(getBusinessDetailsById(businessId)).then(() =>
            setIsLoaded(true)
        );
        dispatch(getReviewsByBusinessId(businessId)).then(() =>
            setIsLoaded(true)
        );
    }, [dispatch, businessId]);


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
            <h1>{business.name}</h1>
            <p>**AvgRating: {avgRating(reviews)}** {`(${reviews.length} ${reviews.length !== 0 && reviews.length === 1 ? 'Review' : reviews.length > 1 ? 'Reviews' : 'New' })`}</p>
            <p>{business.price} {business.category}</p>
                        <button>
                            <OpenModalMenuItem
                                itemText="View all Images"
                                modalComponent={<ViewAllImagesModal businessId={businessId} />}
                            />
                        </button>
                        <div>
                            <button>
                                <OpenModalMenuItem
                                    itemText='Write a review'
                                    modalComponent={<CreateReviewFormModal businessId={businessId} userId={userId} />}
                                />
                            </button>
                            <button onClick={handleClick}>Add photo</button></div>
                        <div className="business-details">
                            <div>{business.website}</div>
                            <div>{business.phone_number}</div>
                            <div>{business.address} {business.city} {business.state} {business.postal_code}</div>
                        </div>
                        <button>
                <OpenModalMenuItem
                    itemText="Add more images"
                    modalComponent={
                        <CreateImageFormModal businessId={businessId} />
                    }
                />
            </button>
                        <h3>About the Business</h3>
                        <div className="description">
                <pre className="description-content">
                    {business.description}
                </pre>
            </div>
                    </div>
                    <h4>Overall rating</h4>
                    <p>**AvgRating: {avgRating(reviews)}**</p>
                    <p>{business.BusinessReviews?.length} reviews</p>



                </div>
            )}




            <LoadReviews businessId={business.id}/>


            <hr />





        </div>
    );
};

export default BusinessDetails;
