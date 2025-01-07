import { Link } from "react-router-dom";

import ErrorModal from '../ErrorModal';
import useRegister from "../../hooks/user/useRegister";
export default function RegisterPage() {
    const { error, setError, userData, setUserData, onSubmit } = useRegister()

    return (
        <section id="register-page" className="content auth">
            {error && <ErrorModal error={{ error, onClose }} />}
            <form onSubmit={onSubmit} id="register">
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input value={userData.email} onChange={onChange} type="email" id="email" name="email" placeholder="maria@email.com" />

                    <label htmlFor="pass">Password:</label>
                    <input value={userData.password} onChange={onChange} type="password" name="password" id="register-password" />

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input value={userData.repass} onChange={onChange} type="password" name="confirm-password" id="confirm-password" />

                    <input className="btn submit" type="submit" value="Register" />

                    <p className="field">
                        <span>If you already have profile click <Link to="/users/login">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    )
    function onClose() {
        setError(null);
    }
    function onChange(e) {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }
}