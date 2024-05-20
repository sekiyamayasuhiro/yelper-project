import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};

        if (password.length < 4) {
            newErrors.password = "Password must be at least 4 characters long";
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword =
                "Confirm Password field must be the same as the Password field";
        }

        if (username.length < 4) {
            newErrors.username = "Username must be at least 4 characters long";
        }

        const atSymbolCount = email
            .split("")
            .filter((char) => char === "@").length;
        const dotCount = email.split("").filter((char) => char === ".").length;

        if (atSymbolCount !== 1 || dotCount < 1) {
            newErrors.email = "Email must be a valid email";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        //
        const serverResponse = await dispatch(
            thunkSignup({
                email,
                username,
                password,
            })
        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            closeModal();
        }
    };

    return (
        <>
            <h1>Sign Up</h1>
            {errors.server && <p className="form-error">{errors.server}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                {errors.email && <p className="form-error">{errors.email}</p>}
                <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                {errors.username && (
                    <p className="form-error">{errors.username}</p>
                )}
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.password && (
                    <p className="form-error">{errors.password}</p>
                )}
                <label>
                    Confirm Password
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.confirmPassword && (
                    <p className="form-error">{errors.confirmPassword}</p>
                )}
                <button type="submit">Sign Up</button>
            </form>
        </>
    );
}

export default SignupFormModal;
