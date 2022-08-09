import { isAuthenticated, getToken } from './lib/auth.js';
import { getMyCollections } from './lib/quotes-api.js';

if(!isAuthenticated()) window.location.href = 'login';

const collections = (await getMyCollections(getToken()));

if (collections.owns      ) renderCollections(collections.owns, "Owns");
if (collections.moderates ) renderCollections(collections.moderates, "Moderates");
if (collections.follows   ) renderCollections(collections.follows, "Following");

function renderCollections(collection, type) {
  console.log(collection);

  const clone = document.querySelector('template#collection-template').content.cloneNode(true);
  clone.querySelector('.type').innerText = type;

  collection.forEach((elm) => {
    clone.querySelector('.name').innerText = elm.name;
    // clone.querySelector('.quotes').innerText = `(${elm.attributes.quotes.data.length} quotes)`;
    clone.querySelector('.collection').addEventListener('click', (e) => {
      window.location.href = `collection/?id=${elm.id}`
    });
    if (type !== "Owns") {
      clone.querySelector('.open-settings-button ').remove();
    } else {
      clone.querySelector('.open-settings-button ').addEventListener('click', (e) => {
        e.stopPropagation();
        window.location.href = `collection-settings/?id=${elm.id}`
      });
    }
    document.querySelector('.collections').appendChild(clone);
  });
}