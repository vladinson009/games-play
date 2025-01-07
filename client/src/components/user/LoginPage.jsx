import { Link } from 'react-router-dom';
import useLogin from '../../hooks/user/useLogin';
import ErrorModal from '../ErrorModal';

export default function LoginPage() {
    const { error, setError, userData, setUserData, onSubmit } = useLogin()

    return (
        <section id="login-page" className="auth">
            {error && <ErrorModal error={{ error, onClose }} />}
            <form onSubmit={onSubmit} id="login">
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        value={userData.email}
                        onChange={onChange}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Sokka@gmail.com" />

                    <label htmlFor="login-pass">Password:</label>
                    <input
                        value={userData.password}
                        onChange={onChange}
                        type="password"
                        id="login-password"
                        name="password" />
                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>If you don&apos;t have profile click <Link to="/users/register">here</Link></span>
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