import { API_URL } from '../config.js';

export async function login(username, password) {
  let reply = await fetch(`${API_URL}/auth/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier: username,
      password: password,
    }),
  });
  let data = await reply.json();
  return data;
}

export function storeAuthenticatedUserAsCookie(authData) {
  document.cookie = JSON.stringify(authData);
}

export function readAuthenticatedUserFromCookie() {
  try {
    return {...JSON.parse(document.cookie), isAuthenticated: true };
  } catch {
    return { isAuthenticated: false }
  }
}

export function logout(){
  document.cookie = "";
}