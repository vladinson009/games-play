const BASE_URL = 'http://localhost:3030';

async function requester(url, options) {
  const response = await fetch(BASE_URL + url, options);
  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }
  if (response.status === 204) {
    return response;
  }
  return response.json();
}

function createOptions(method, body) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
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
