import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import userApi from '../../api/user';
import { setSession } from '../../util/sesionStorage';
import ErrorModal from '../ErrorModal';


export default function LoginPage() {
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);
        try {
            const user = await userApi.login(email, password);
            setSession(user);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    }
    function onClose() {
        setError(null);
    }
    return (
        //  < !--Login Page(Only for Guest users ) -->
        <section id="login-page" className="auth">
            {error && <ErrorModal error={{ error, onClose }} />}
            <form onSubmit={onSubmit} id="login">
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Sokka@gmail.com" />

                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password" />
                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>If you don&apos;t have profile click <Link to="/users/register">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    )
}