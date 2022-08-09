import { getCollection, getUsers, getCollectionModerators, getCollectionOwner } from '../lib/quotes-api.js';
import { getToken } from '../lib/auth.js';

const urlParameters = new URLSearchParams(window.location.search);

if (!urlParameters.has('id')) throw new Error('Parameter \'id\' expected in url.');

const collectionIdAsText = urlParameters.get('id');
const collectionId = parseInt(collectionIdAsText, 10);

if (isNaN(collectionId)) throw new Error('Parameter \'id\' is not a number.');

const collection = await getCollection(collectionId);

document.getElementById('name').value = collection.attributes.name;

const users = await getUsers(getToken());
const moderators = await getCollectionModerators(collectionId, getToken());
moderators.forEach((moderator) => {
  const clone = document.querySelector('template#user').content.cloneNode(true)
  clone.querySelector('.username').innerText = moderator.attributes.username;
  clone.querySelector('.remove-moderator').addEventListener('click', (e) => {
    // TODO: implement remove moderator functionality
    console.log(moderator.attributes.username);
    e.preventDefault();
  });
  document.querySelector('#moderators').appendChild(clone);
});

const owner = await getCollectionOwner(collectionId, getToken());
document.getElementById('owner').value = owner.attributes.username;

console.log({
  users,
  moderators,
  owner,
});
