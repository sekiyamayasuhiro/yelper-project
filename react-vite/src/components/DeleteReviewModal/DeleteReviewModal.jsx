import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteReview } from '../../redux/review.js';


const DeleteReviewModal = ({ reviewId }) => {

    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(deleteReview(reviewId));

        closeModal();
    };

    return (
        <div className="delete-review-modal">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this review?</p>
            <button type="button" className="delete-review" onClick={handleDelete}>Yes (Delete Review)</button>
            <button type="button" className="keep-review" onClick={closeModal}>No (Keep Review)</button>
        </div>
    );
};

export default DeleteReviewModal;
