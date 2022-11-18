import { API_URL, LOGIN_EXPIRATION_IN_SECONDS } from '../config.js';

export function getMyUserId() {
  return readAuthenticatedUserFromCookie().user.id;
}

export async function login(username, password) {
  const reply = await fetch(`${API_URL}/auth/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier: username,
      password: password,
    }),
  });

  if(reply.status === 400) throw Error(reply.error);
  let data = await reply.json();
  return data;
}

export function storeAuthenticatedUserAsCookie(authData) {
  document.cookie = `auth=${JSON.stringify(authData)};path=/;max-age=${LOGIN_EXPIRATION_IN_SECONDS}`;
}

export function readAuthenticatedUserFromCookie() {
  try {
    return {...JSON.parse(getCookiesMap(document.cookie).auth), isAuthenticated: true };
  } catch {
    return { isAuthenticated: false }
  }
}

export function logout(){
  document.cookie = "auth=;path=/";
}

export function isAuthenticated() {
  return readAuthenticatedUserFromCookie().isAuthenticated;
}

export function getToken() {
  return readAuthenticatedUserFromCookie().jwt;
} 

function getCookiesMap(cookiesString) {
  return cookiesString.split(";")
    .map(function(cookieString) {
        return cookieString.trim().split("=");
    })
    .reduce(function(acc, curr) {
        acc[curr[0]] = curr[1];
        return acc;
    }, {});
}

export async function register(username, email, password) {
  const reply = await fetch(`${API_URL}/auth/local/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  });
  if(reply.status === 400) throw Error(reply.error);
  const data = await reply.json();
  return data;
}