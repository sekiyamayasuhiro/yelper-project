import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteImage } from '../../redux/image.js';


const DeleteImageModal = ({ imageId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(deleteImage(imageId));

        closeModal();
    };

    return (
        <div className="login-form-modal-container">
            <div className="login-form-modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Delete Image</h2>
                <p>Are you sure you want to delete this image?</p>
                <div className='delete-review-buttons'>
                <button type="button" className="login-modal-login button" onClick={handleDelete}>Yes (Delete Image)</button>
                <button type="button" className="login-modal-login button demo" onClick={closeModal}>No (Keep Image)</button>
            </div>
            </div>

        </div>
    );
};

export default DeleteImageModal;
