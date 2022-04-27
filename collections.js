import { isAuthenticated, getToken } from './lib/auth.js';
import { getMyCollections } from './lib/quotes-api.js';

if(!isAuthenticated()) window.location.href = 'login';

const collections = (await getMyCollections(getToken())).data;

collections.forEach((collection) => {
  console.log(collection)
  const clone = document.querySelector('template#collection-template').content.cloneNode(true);
  clone.querySelector('.name').innerText = collection.attributes.name;
  clone.querySelector('.quotes').innerText = `(${collection.attributes.quotes.data.length} quotes)`;
  console.log(clone.querySelector('.add-quote'))
  clone.querySelector('.collection').addEventListener('click', () => {
    window.location.href = `collection/?id=${collection.id}`
  });
  document.querySelector('.collections').appendChild(clone);
})