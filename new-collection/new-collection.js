import { getToken } from '../lib/auth.js';
import { createCollection } from '../lib/quotes-api.js';

async function tryCreateCollection() {
  const name = document.querySelector('#name').value;
  console.log(await createCollection(getToken(), name));
  window.location.href = '/';
}

document.querySelector('#create-collection').addEventListener('submit', (event) => {
  event.preventDefault();
  tryCreateCollection()
});