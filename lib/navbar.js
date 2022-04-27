import { isAuthenticated, readAuthenticatedUserFromCookie } from './auth.js';


const unauthenticatedNav = `
<nav>
<div class="logo">Quote</div>
<div style="flex-grow: 1"></div>
<div><a href="/login">Login</a></div>
</nav>
`;

if (isAuthenticated()) {
  const userData = readAuthenticatedUserFromCookie().user;
  const authenticatedNav = `
    <nav>
      <div class="logo">Quote</div>
      <div style="flex-grow: 1"></div>
      <div class="profile">${userData.username[0]}</div>
    </nav>
  `;
  document.querySelector('body').innerHTML = authenticatedNav + document.querySelector('body').innerHTML;
} else {
  document.querySelector('body').innerHTML = unauthenticatedNav + document.querySelector('body').innerHTML;
}