import {
  register,
  storeAuthenticatedUserAsCookie,
  readAuthenticatedUserFromCookie
} from '../lib/auth.js';

document.querySelector('#register').addEventListener('click', tryRegister);

const user = readAuthenticatedUserFromCookie();
if(user.isAuthenticated) {
  window.location.href = '/';
}

async function tryRegister(event) {
  event.preventDefault();
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const email = document.querySelector('#email').value;
  try {
    const res = await register(username, email, password);
    storeAuthenticatedUserAsCookie(res);
    window.location.href = '/';
  } catch {
    document.querySelector('.auth-error').classList.remove('hidden');
    setTimeout(() => {
      document.querySelector('.auth-error').classList.add('hidden');
    }, 1000 * 5)
  }
}