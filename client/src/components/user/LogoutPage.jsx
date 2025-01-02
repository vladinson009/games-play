import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import sessionContext from '../../util/sessionContext';
import fetchApi from '../../api/fetchApi';

export default function LogoutPage() {
    const context = useContext(sessionContext);

    useEffect(() => {
        (async function logout() {
            await fetchApi.get('/users/logout');
            context.setSession({});
            sessionStorage.removeItem('auth');
        })()
    }, []);

    return <Navigate to="/" replace />;
}
