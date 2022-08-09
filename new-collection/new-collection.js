import { getToken } from '../lib/auth.js';
import { createCollection, getUsers, getUserByName } from '../lib/quotes-api.js';

const users = await getUsers(getToken());
const moderators = [];

// Set moderator functionality
users.forEach(user => {
  const option = document.createElement('option');
  option.value = user.username;
  option.innerText = user.username;
  option.dataset.id = user.id;
  document.querySelector('#available-moderators').appendChild(option);
});

document.querySelector('#moderator').addEventListener('change', async (newVal) => {
  const res = await getUserByName(document.querySelector('#moderator').value, getToken());
  document.querySelector('#moderator').value = '';
  if(res.length === 0) {
    alert('user not found!');
  } else {
    moderators.push(res[0]);
  }
  updateModerators(moderators);
});

updateModerators(moderators);

async function tryCreateCollection() {
  const name = document.querySelector('#name').value;
  console.log('mod-id', moderators.map(mod => mod.id))
  console.log(await createCollection(getToken(), name, moderators.map(mod => mod.id)));
  window.location.href = '/';
}

document.querySelector('#create-collection').addEventListener('submit', (event) => {
  event.preventDefault();
  tryCreateCollection()
});

function updateModerators(moderators) {
  document.querySelectorAll('#moderators li').forEach((li) => li.remove());
  moderators.forEach((moderator) => {
    console.log(moderator);
    const clone = document.querySelector('template#user').content.cloneNode(true)
    clone.querySelector('.username').innerText = moderator.attributes.username;
    clone.querySelector('.remove-moderator').addEventListener('click', (e) => {
      console.log(moderator);
      moderators.splice(moderators.indexOf(moderator), 1);
      updateModerators(moderators);
      e.preventDefault();
    });
    document.querySelector('#moderators').appendChild(clone);
  });
}