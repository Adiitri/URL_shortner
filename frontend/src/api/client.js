// Single place that knows how to talk to the backend.
// Every function here matches one backend route exactly.

// Set in .env (local) or as an environment variable on your host (production).
// Local dev -> http://localhost:8000
// Production -> your deployed Render URL, e.g. https://your-backend.onrender.com
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async  function request(path, { method = 'GET', body, token } = { }) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json()
  .catch(() => null );

  if (!res.ok) {
    // backend send errors in format { error: ...} or { message: ...}
    const message = data?.error?.message || data?.error || data?.message || 'Something went wrong';
    throw new Error(typeof message === 'string' ? message : JSON.stringify(message));
  }

  return data;
 }

export function signup({ firstname, lastname, email, password }) {
  return request('/user/signup', {  // will return token
    method: 'POST',
    body: { firstname, lastname, email, password },
  }); 
}

export function login({ email, password }) {
  return request( '/user/login', {
    method: 'POST',
    body: { email, password },
  } );
}

export function createShortUrl(url, token) {
  return request('/url/shorten', {
    method: 'POST',
    body: { url },
    token,
  });
}

export function getMyUrls(token) {
  return request('/url/codes', { token });
}

export function deleteUrl(id, token) {
  return request(`/url/${id}`, { method: 'DELETE', token });
}
