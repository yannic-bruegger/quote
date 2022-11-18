import { getToken } from '../lib/auth.js';
import { createQuote, getMyCollections } from '../lib/quotes-api.js';
import { successMessage } from '../lib/success-message.js';

async function tryCreateQuote() {
  const collection = document.querySelector('#collection').value;
  const content = document.querySelector('#content').value;
  const quoted = document.querySelector('#quoted').value;
  const quote = await createQuote(getToken(), {content, quoted, collection});
  successMessage('Quote created successfully');
  setTimeout(function(){ window.location.href = `/collection/?id=${collection}&quoteId=${quote.data.id}` }, 300);
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

const urlParameters = new URLSearchParams(window.location.search);
const collectionId = parseInt(urlParameters.get('collectionId'), 10);

if (urlParameters.has('collectionId')) {
  document.getElementById('collection').value = collectionId;
  console.log("value", document.getElementById('collection').value);
}