import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteBusiness, getBusinessesByCurrentUser } from '../../redux/business.js';

const DeleteBusinessModal = ({ businessId }) => {

    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = async () => {

        await dispatch(deleteBusiness(businessId))
            .then(() => {
                dispatch(getBusinessesByCurrentUser());
            });

    };

    return (
        <div className="delete-business-modal">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this business?</p>
            <button className="delete-business" onClick={handleDelete}>Yes (Delete Business)</button>
            <button className="keep-business" onClick={closeModal}>No (Keep Business)</button>
        </div>
    );

};

export default DeleteBusinessModal;
