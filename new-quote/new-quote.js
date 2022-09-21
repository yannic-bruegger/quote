import { getToken } from '../lib/auth.js';
import { createQuote, getMyCollections } from '../lib/quotes-api.js';

async function tryCreateQuote() {
  const collection = document.querySelector('#collection').value;
  const content = document.querySelector('#content').value;
  const quoted = document.querySelector('#quoted').value;
  await createQuote(getToken(), {content, quoted, collection});
  window.location.href = '/';
}

document.querySelector('#create-quote').addEventListener('submit', (event) => {
  event.preventDefault();
  tryCreateQuote()
});

const reply = await getMyCollections(getToken());

for (const collection of (reply.owns.concat(reply.moderates))) {
  const option = document.createElement('option');
  option.value = collection.id;
  option.innerText = collection.name;
  document.querySelector('#collection').appendChild(option);
}
