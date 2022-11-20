import { isAuthenticated, readAuthenticatedUserFromCookie } from './auth.js';

const icon = `
<svg id="quotes-icon-wrapper"
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 653.28 626.14">
    <g id="quotes-icon">
        <path d="M326.66,.01c81.5,0,162.99-.04,244.49,.02,39.06,.03,71.84,26.31,80.18,64.35,1.25,5.69,1.84,11.64,1.85,17.47,.11,108.75,.13,217.49,.05,326.24-.03,45.57-36.15,81.65-81.69,81.78-33.25,.1-66.5,.09-99.75,0-15.23-.04-27.17,5.91-36.3,18.17-24.85,33.37-49.89,66.61-74.87,99.88-18.26,24.32-49.75,24.3-68.02-.04-24.98-33.28-50.01-66.51-74.87-99.88-9.14-12.27-21.09-18.18-36.32-18.13-33,.1-66,.07-99,.02-40.88-.07-74.01-27.79-81.22-68.05-.83-4.65-1.14-9.44-1.14-14.17C0,299.17-.02,190.67,.03,82.18,.04,41.44,28.59,7.75,68.73,1.08,73.64,.26,78.69,.06,83.67,.06,164.67,0,245.66,.01,326.66,.01Zm-54.73,289c-.55,1.61-.72,2.2-.94,2.76-6.84,17.68-17.82,32.55-31.03,45.92-7.45,7.54-7.88,17.46-1.1,24.35,7.01,7.13,18.39,7.4,25.63,.24,18.17-17.96,32.88-38.34,41.15-62.72,12.24-36.07,10.07-70.93-10.98-103.42-16.79-25.91-46.24-37.56-76.54-31.09-29.98,6.4-52.89,32.62-54.7,61.77-2.64,42.66,35.01,77.1,79.21,72.09,10.16-1.15,19.63-4.42,29.29-9.91Zm176.52,1.43c-.08-.43,.06-.16,0,.03-.36,1.06-.75,2.11-1.17,3.15-6.9,16.93-17.62,31.24-30.38,44.15-7.32,7.4-7.77,17.17-1.19,24.07,6.91,7.24,18.36,7.73,25.6,.61,18.86-18.55,33.97-39.7,42.09-65.12,11.47-35.85,8.63-70.17-12.34-102.23-18.06-27.62-51.17-36.67-78.9-29.32-35.58,9.42-57.88,44.36-50.38,79.01,7.99,36.94,45.39,61.06,83.14,53.17,8.04-1.68,15.74-4.99,23.55-7.53Z"/>
    </g>
</svg>
`;

const unauthenticatedNav = `
<nav>
  <div class="logo">${icon}Quotes</div>
  <div style="flex-grow: 1"></div>
  <div><a href="/login/">Login</a></div>
</nav>
`;

if (isAuthenticated()) {
  const userData = readAuthenticatedUserFromCookie().user;
  const authenticatedNav = `
    <nav>
      <div class="logo">${icon}Quotes</div>
      <div style="flex-grow: 1"></div>
      <div class="profile">${userData.username[0]}</div>
    </nav>
  `;
  document.querySelector('body').innerHTML = authenticatedNav + document.querySelector('body').innerHTML;
  document.querySelector('.profile').addEventListener('click', () => window.location.href = '/account-settings/');
} else {
  document.querySelector('body').innerHTML = unauthenticatedNav + document.querySelector('body').innerHTML;
}
document.querySelector('.logo').addEventListener('click', () => window.location.href = '/');