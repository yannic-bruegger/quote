import { isAuthenticated, getToken } from './lib/auth.js';
import { getMyCollections } from './lib/quotes-api.js';

if(!isAuthenticated()) window.location.href = 'login';

const collections = (await getMyCollections(getToken())).data;

collections.forEach((collection) => {
  const clone = document.querySelector('template#collection-template').content.cloneNode(true);
  clone.querySelector('.name').innerText = collection.attributes.name;
  clone.querySelector('.quotes').innerText = `(${collection.attributes.quotes.data.length} quotes)`;
  clone.querySelector('.collection').addEventListener('click', (e) => {
    window.location.href = `collection/?id=${collection.id}`
  });
  clone.querySelector('.open-settings-button ').addEventListener('click', (e) => {
    e.stopPropagation();
    window.location.href = `collection-settings/?id=${collection.id}`
  });
  document.querySelector('.collections').appendChild(clone);
});