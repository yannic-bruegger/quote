import {
  login,
  storeAuthenticatedUserAsCookie,
  readAuthenticatedUserFromCookie
} from '../lib/auth.js';

document.querySelector('#login').addEventListener('click', tryLogin);

const user = readAuthenticatedUserFromCookie();
if(user.isAuthenticated) {
  console.log(user);
}

async function tryLogin(event) {
  event.preventDefault();
  const username = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const res = await login(username, password);
  storeAuthenticatedUserAsCookie(res);
  console.log(res);
}