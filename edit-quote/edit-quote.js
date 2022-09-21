import { getToken } from '../lib/auth.js';
import { updateQuote, getSingleQuote, deleteQuote } from '../lib/quotes-api.js';

const urlParameters = new URLSearchParams(window.location.search);

if (!urlParameters.has('id')) throw new Error('Parameter \'id\' expected in url.');

const quoteIdAsText = urlParameters.get('id');
const quoteId = parseInt(quoteIdAsText, 10);

if (isNaN(quoteId)) throw new Error('Parameter \'id\' is not a number.');

const quote = await getSingleQuote(quoteId, getToken());
const collectionId = quote.attributes.collection.data.id;

document.getElementById('content').value = quote.attributes.content;
document.getElementById('quoted').value = quote.attributes.quoted;

async function tryUpdateQuote() {
  const content = document.querySelector('#content').value;
  const quoted = document.querySelector('#quoted').value;
  console.log(await updateQuote(getToken(), {quoteId, content, quoted, collectionId}));
  window.location.href = `/collection/?id=${collectionId}&quoteId=${quoteId}`;
}

document.querySelector('#edit-quote').addEventListener('submit', (event) => {
  event.preventDefault();
  tryUpdateQuote()
});

document.querySelector('#delete').addEventListener('click', async (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this quote?')) {
        await deleteQuote(quoteId, getToken());
        window.location.href = `/collection/?id=${collectionId}`;
    }
});

document.querySelector('#cancel').addEventListener('click', async (e) => {
    e.preventDefault();
    window.location.href = `/collection/?id=${collectionId}&quoteId=${quoteId}`;
});