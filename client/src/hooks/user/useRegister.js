import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import sessionContext from '../../util/sessionContext';
import userApi from '../../api/user';
import { getSession, setSession } from '../../util/sesionStorage';

export default function () {
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
  return { error, setError, userData, setUserData, onSubmit };
}
