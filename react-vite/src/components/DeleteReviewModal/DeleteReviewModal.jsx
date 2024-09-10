import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteReview } from '../../redux/review.js';
import './DeleteReviewModal.css'

const DeleteReviewModal = ({ reviewId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(deleteReview(reviewId));
        closeModal();
    };

    return (
        <div className="login-form-modal-container">
            <div className="login-form-modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Remove Review</h2>
                <div className='delete-review-buttons'>
                    <button type="button" onClick={closeModal} className="login-modal-login button">Keep Review</button>
                    <button type="button" onClick={handleDelete} className="login-modal-login button demo">Remove Review</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteReviewModal;
