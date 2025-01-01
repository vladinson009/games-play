export function setSession(data) {
  const body = {
    _id: data._id,
    email: data.email,
    token: data.accessToken,
  };
  sessionStorage.setItem('auth', JSON.stringify(body));
}
export function getSession() {
  return sessionStorage.getItem('auth') ? JSON.parse(sessionStorage.getItem('auth')) : null;
}
export function deleteSession() {
  sessionStorage.removeItem('auth');
}
