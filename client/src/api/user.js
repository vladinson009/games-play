import fetchApi from './fetchApi';

function login(email, password) {
  return fetchApi.post('/users/login', { email, password });
}
function register(email, password, repass) {
  if (password !== repass) {
    throw new Error('Passwords do not match');
  }
  return fetchApi.post('/users/register', { email, password });
}

export default { login, register };
