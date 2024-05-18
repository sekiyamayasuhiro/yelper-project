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
        <div className="delete-image-modal">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this image?</p>
            <button type="button" className="delete-image" onClick={handleDelete}>Yes (Delete Image)</button>
            <button type="button" className="keep-image">No (Keep Image)</button>
        </div>
    );
};

export default DeleteImageModal;
