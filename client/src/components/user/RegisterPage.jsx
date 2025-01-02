import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import sessionContext from '../../util/sessionContext';
import ErrorModal from '../ErrorModal';
import userApi from '../../api/user';
import { getSession, setSession } from '../../util/sesionStorage';

export default function RegisterPage() {
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState({ email: '', password: '', 'confirm- password': '' });

    const navigate = useNavigate();
    const sessionCtx = useContext(sessionContext);

    async function onSubmit(e) {
        e.preventDefault();
        try {
            const user = await userApi.register(userData.email, userData.password, userData.repass);
            setSession(user);
            sessionCtx.setSession(getSession());
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    }
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