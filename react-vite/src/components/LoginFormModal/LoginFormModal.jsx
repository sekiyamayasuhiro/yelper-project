import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(
            thunkLogin({
                email,
                password,
            })
        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            closeModal();
        }
    };

    // const handleDemoLogin = async (e) => {
    //     e.preventDefault();
    //     setErrors({});
    //     const demoLogin = await dispatch(
    //         thunkLogin({
    //             email: "demo@aa.io",
    //             password: "password",
    //         })
    //     );
    //     if (demoLogin) {
    //         setErrors(demoLogin);
    //     } else {
    //         closeModal();
    //     }
    // };

    const demoUser = () => {
        setEmail("demo@aa.io");
        setPassword("password");
    };

    return (
        <>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Email
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    {errors.email && (
                        <p className="login-form-error">{errors.email}</p>
                    )}
                </div>
                <div>
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
                        <p className="login-form-error">{errors.password}</p>
                    )}
                </div>
                <div>
                    <button type="submit">Log In</button>
                </div>
                <div>
                    <button onClick={demoUser}>Demo User</button>
                </div>
            </form>
        </>
    );
}

export default LoginFormModal;
