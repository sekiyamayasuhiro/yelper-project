import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkLogin } from "../../redux/session";
import { useModal } from "../../context/Modal";
import { IoPersonCircleOutline } from "react-icons/io5";
import "./LoginForm.css";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from '../OpenModalButton/OpenModalButton'

function LoginFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const [modalOpen, setModalOpen] = useState(false);

    const handleClick = () => {
        closeModal()
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors

        const serverResponse = await dispatch(
            thunkLogin({ email, password })
        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            closeModal();
        }
    };

    const demoUser = () => {
        setEmail("demo@aa.io");
        setPassword("password");
    };

    return (
        <div className="login-form-modal-container">
            <div className="login-form-modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <IoPersonCircleOutline className="login-modal-profile-icon" />
                <h2>Sign in to Yelp</h2>
                <p>Connect with great local businesses</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        {errors.email && (
                            <p className="form-error">{errors.email}</p>
                        )}
                        <input
                            placeholder="Email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        {errors.password && (
                            <p className="form-error">{errors.password}</p>
                        )}
                        <input
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" className="login-modal-login button">Log In</button>
                    </div>
                    <div>
                        <button
                            type="button" // Use type="button" to avoid form submission
                            onClick={demoUser}
                            className="login-modal-login button demo"
                        >
                            Demo User
                        </button>
                    </div>
                </form>
                <p className="login-modal-footer">
                    New to Yelp? <span className="loginmodal-signuplink"><OpenModalButton buttonText='Sign Up' useButton={false} modalComponent={<SignupFormModal />} /></span>
                </p>

            </div>
        </div>
    );
}

export default LoginFormModal;
