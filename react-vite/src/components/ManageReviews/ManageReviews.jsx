import { FaStar } from "react-icons/fa";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getReviewsByCurrentUser } from "../../redux/review.js";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import UpdateReviewFormModal from "../UpdateReviewFormModal";
import DeleteReviewModal from "../DeleteReviewModal";
// import LoadReviews from "../LoadReviews/LoadReviews.jsx";

const ManageReviews = () => {
    const dispatch = useDispatch();
    const reviews = useSelector((state) =>
        Object.values(state.reviewState) ? Object.values(state.reviewState) : []
    );

    useEffect(() => {
        dispatch(getReviewsByCurrentUser());
    }, [dispatch]);

    return (
        <div>
            <div className="manage-reviews-header">
                <h1>Manage Your Reviews</h1>
            </div>
            <div className="review-container-manage-reviews">
                {/* {reviews.map(({ id, business_id}) => (
                    <div key={id}>
                        <LoadReviews businessId={business_id} />
                    </div>
                ))} */}
                {reviews.map(
                    ({
                        id,
                        rating,
                        review_text,
                        user_id,
                        business_id,
                        name,
                        category,
                        address,
                    }) => (
                        <div key={id}>
                            <p>{name}</p>
                            <p>{category}</p>
                            <p>{address}</p>
                            <span>
                                {rating} <FaStar />
                            </span>

                            <div>{review_text}</div>
                            <div>
                                <button>
                                    <OpenModalMenuItem
                                        itemText="Update"
                                        modalComponent={
                                            <UpdateReviewFormModal
                                                reviewId={id}
                                                userId={user_id}
                                                businessId={business_id}
                                                initialReviewText={review_text}
                                                initialRating={rating}
                                            />
                                        }
                                    />
                                </button>
                            </div>
                            <div>
                                <button>
                                    <OpenModalMenuItem
                                        itemText="Delete"
                                        modalComponent={
                                            <DeleteReviewModal reviewId={id} />
                                        }
                                    />
                                </button>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default ManageReviews;
