import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import {
    deleteBusiness,
    getBusinessesByCurrentUser,
} from "../../redux/business.js";
import '../LoginFormModal/LoginForm.css'

const DeleteBusinessModal = ({ businessId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(deleteBusiness(businessId)).then(() => {
            dispatch(getBusinessesByCurrentUser());
        });
        closeModal();
    };

    return (
        <div className="login-form-modal-container">
            <div className="login-form-modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h1>Confirm Delete</h1>
                <p>Are you sure you want to delete this business?</p>
                <button className="login-modal-login button" onClick={handleDelete}>
                    Yes (Delete Business)
                </button>
                <button className="login-modal-login button demo" onClick={closeModal}>
                    No (Keep Business)
                </button>
            </div>
        </div>
    );
};

export default DeleteBusinessModal;
