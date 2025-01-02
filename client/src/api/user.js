import fetchApi from './fetchApi';

function login(email, password) {
  if (!email.trim() || !password.trim()) {
    throw new Error('All fields are required');
  }
  return fetchApi.post('/users/login', { email, password });
}

function register(email, password, repass) {
  if (password !== repass) {
    throw new Error('Passwords does not match');
  }
  if (!email.trim() || !password.trim() || !repass.trim()) {
    throw new Error('All fields are required');
  }
  return fetchApi.post('/users/register', { email, password });
}

function logout() {
  return fetchApi.get('/users/logout');
}
export default { login, register, logout };
