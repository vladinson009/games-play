import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import sessionContext from '../../util/sessionContext';

export default function LogoutPage() {
    const context = useContext(sessionContext);

    useEffect(() => {
        context.setSession({});
        sessionStorage.removeItem('auth');
    }, []);

    return <Navigate to="/" replace />;
}
