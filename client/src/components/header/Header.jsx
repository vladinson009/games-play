import { NavLink } from 'react-router-dom';

export default function Header() {

    return (<header>
        {/* <!-- Navigation --> */}
        <h1><NavLink className={({ isActive }) => isActive ? 'active home' : 'home'} to="/">GamesPlay</NavLink></h1>
        <nav>
            <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/games/catalogue">All games</NavLink>
            {/* <!-- Logged-in users --> */}
            <div id="user">
                <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/games/create">Create Game</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/users/logout">Logout</NavLink>
            </div>
            {/* <!-- Guest users --> */}
            <div id="guest">
                <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/users/login">Login</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/users/register">Register</NavLink>
            </div>
        </nav>
    </header>)
}