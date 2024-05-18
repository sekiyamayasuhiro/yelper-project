import { FaStar } from "react-icons/fa";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsByBusinessId, getReviewsByCurrentUser } from "../../redux/review.js";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import UpdateReviewFormModal from "../UpdateReviewFormModal";
import DeleteReviewModal from '../DeleteReviewModal';


const ManageReviews = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
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
                {reviews.map(({ id, rating, review_text }) => (
                    <div key={id}>
                        <span>{rating}</span>
                        <FaStar />
                        <div>{review_text}</div>

                        <div>
                            <button>
                                <OpenModalMenuItem
                                    itemText="Update"
                                    modalComponent={UpdateReviewFormModal}
                                    reviewId={id}
                                />
                            </button>
                        </div>

                        <div>
                            <button>
                                <OpenModalMenuItem
                                    itemText="Delete"
                                    modalComponent={DeleteReviewModal}
                                    reviewId={id}
                                />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageReviews;
