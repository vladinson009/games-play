import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

import sessionContext from '../../util/sessionContext';
import userApi from '../../api/user';
import { getSession, setSession } from '../../util/sesionStorage';

export default function () {
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({ email: '', password: '' });

  const navigate = useNavigate();
  const sessionCtx = useContext(sessionContext);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const user = await userApi.login(userData.email, userData.password);
      setSession(user);
      sessionCtx.setSession(getSession());
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }
  return { error, setError, userData, setUserData, onSubmit };
}
