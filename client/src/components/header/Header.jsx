import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import sessionContext from '../../util/sessionContext';
export default function Header() {
    const context = useContext(sessionContext);
    const isLoggedIn = !!context.session.token;


    return (<header>
        <h1><NavLink className={({ isActive }) => isActive ? 'active home' : 'home'} to="/">GamesPlay</NavLink></h1>
        <nav>
            <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/games/catalogue">All games</NavLink>
            {isLoggedIn ? <div id="user">
                <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/games/create">Create Game</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/users/logout">Logout</NavLink>
                <em>{context.session.email}</em>
            </div> : <div id="guest">
                <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/users/login">Login</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/users/register">Register</NavLink>
            </div>}
        </nav>
    </header >)
}