import {
  getCollection,
  getUsers,
  getUserByName,
  getCollectionModerators,
  getCollectionOwner,
  updateCollection,
  deleteCollection,
} from '../lib/quotes-api.js';
import { getToken } from '../lib/auth.js';
import { removeUsersFromCollection } from '../lib/helper.js';



// Check if url parameters are correct

const urlParameters = new URLSearchParams(window.location.search);
if (!urlParameters.has('id')) throw new Error('Parameter \'id\' expected in url.');


// Get collection id from url parameters

const collectionIdAsText = urlParameters.get('id');
const collectionId = parseInt(collectionIdAsText, 10);
if (isNaN(collectionId)) throw new Error('Parameter \'id\' is not a number.');


// Get collection data from api

const collection = await getCollection(collectionId);

// Name

document.getElementById('name').value = collection.attributes.name;


// Users list

const users = await getUsers(getToken());
const moderators = await getCollectionModerators(collectionId, getToken());
const owner = await getCollectionOwner(collectionId, getToken());

const availableModerators = removeUsersFromCollection(users, moderators);


// Set moderator functionality
availableModerators.forEach(user => {
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

document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  await updateCollection(collectionId, document.querySelector('#name').value, moderators.map(mod => mod.id) ,getToken());
  history.back();
});

document.querySelector('#delete').addEventListener('click', async (e) => {
  e.preventDefault();
  if (confirm('Are you sure you want to delete this collection?')) {
    await deleteCollection(collectionId, getToken());
    window.location.href = `/`;
  }
});

/*
// Set owner functionality
const availableOwners = removeUsersFromCollection(users, [owner]);
document.getElementById('owner').value = owner.attributes.username;

availableOwners.forEach(user => {
  const option = document.createElement('option');
  option.value = user.id;
  option.innerText = user.username;
  document.querySelector('#available-owners').appendChild(option);
});
*/

function updateModerators(moderators) {
  document.querySelectorAll('#moderators li').forEach((li) => li.remove());
  moderators.forEach((moderator) => {
    const clone = document.querySelector('template#user').content.cloneNode(true)
    clone.querySelector('.username').innerText = moderator.attributes.username;
    clone.querySelector('.remove-moderator').addEventListener('click', (e) => {
      moderators.splice(moderators.indexOf(moderator), 1);
      updateModerators(moderators);
      e.preventDefault();
    });
    document.querySelector('#moderators').appendChild(clone);
  });
}