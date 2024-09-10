import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors


        const serverResponse = await dispatch(
            thunkSignup({
                first_name: firstName,
                last_name: lastName,
                email,
                username,
                password,
                confirm_password: confirmPassword
            })
        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            closeModal();
        }
    };

    return (
        <div className="login-form-modal-container">
            <div className="login-form-modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Sign up for Yelper</h2>

                <div>
                    {errors.server && <p className="form-error">{errors.server}</p>}
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        {errors.first_name && (
                            <p className="form-error">{errors.first_name}</p>
                        )}
                        <input placeholder='First Name' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div>
                        {errors.last_name && (
                            <p className="form-error">{errors.last_name}</p>
                        )}
                        <input placeholder='Last Name' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <div>
                        {errors.email && (
                            <p className="form-error">{errors.email}</p>
                        )}
                        <input
                            placeholder="Email address"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        {errors.username && (
                            <p className="form-error">{errors.username}</p>
                        )}
                        <input
                            placeholder="Username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        {errors.password && (
                            <p className="form-error">{errors.password}</p>
                        )}
                        <input
                            placeholder="Password"
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        {errors.confirm_password && (
                            <p className="form-error">{errors.confirm_password}</p>
                        )}
                        <input
                            placeholder="Confirm password"
                            type='password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" className="login-modal-login button">Sign Up</button>
                    </div>
                </form>
                <p className="login-modal-footer">
                    Already on Yelper? <span className="loginmodal-signuplink"><OpenModalButton buttonText='Log in' useButton={false} modalComponent={<LoginFormModal />} /></span>
                </p>
            </div>
        </div>
    );
}

export default SignupFormModal;
