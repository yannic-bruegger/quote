import {
  logout,
  isAuthenticated
} from '../lib/auth.js';

if(isAuthenticated) logout();

window.location.href = '/'