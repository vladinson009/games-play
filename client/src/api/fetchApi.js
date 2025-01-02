import { deleteSession, getSession } from '../util/sesionStorage';

const BASE_URL = 'http://localhost:3030';

async function requester(url, options) {
  const response = await fetch(BASE_URL + url, options);
  if (!response.ok) {
    if (response.status === 403) {
      deleteSession();
      throw new Error('Invalid credentials');
    }
    throw new Error(`${response.status} - ${response.statusText}`);
  }
  if (response.status === 204) {
    return response;
  }
  return response.json();
}

function createOptions(method, body) {
  const session = getSession();
  const options = {
    method,
    headers: {},
  };
  if (body) {
    options.body = JSON.stringify(body);
    options.headers['Content-Type'] = 'application/json';
  }
  if (session) {
    options.headers['X-Authorization'] = session.token;
  }
  return options;
}

function get(url) {
  return requester(url, createOptions('GET'));
}
function post(url, body) {
  return requester(url, createOptions('POST', body));
}
function put(url, body) {
  return requester(url, createOptions('PUT', body));
}
function del(url) {
  return requester(url, createOptions('DELETE'));
}
export default { get, post, put, del };
