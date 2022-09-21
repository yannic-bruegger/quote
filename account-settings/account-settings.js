import { getMe, changePassword, updateUserInfo } from '../lib/quotes-api.js';
import { getMyUserId, getToken } from '../lib/auth.js';

const me = await getMe(getToken());
console.log(me);

document.querySelector('#displayname').value = me.displayname;
document.querySelector('#email').value = me.email;

document.querySelector('#change-password').addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log('Change Password');
  const currentPassword = document.querySelector('#currentpassword').value
  const newPassword = document.querySelector('#newpassword').value
  const newPasswordConfirmation = document.querySelector('#newpasswordconfirmation').value
  const newPasswordConfirmed = newPassword === newPasswordConfirmation;

  try {
    const res = await changePassword(currentPassword, newPassword, newPasswordConfirmation, getToken())
    console.log(res);
  } catch {

  }
});

document.querySelector('#change-account-info').addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log('Change Account Info');
  const displayName = document.querySelector('#displayname').value
  const email = document.querySelector('#email').value

  try {
    const res = await updateUserInfo(getMyUserId(), {displayName: displayName, email: email}, getToken())
    console.log(res);
  } catch (error) {
    console.error(error);
  }
});

document.querySelector('#logout').addEventListener('click', () => window.location.href = '/logout');