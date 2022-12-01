import { getToken, isAuthenticated } from '../lib/auth.js';
import { getMyRoleForCollection } from '../lib/helper.js';
import { 
  getCollection,
  getCollectionModerators,
  getCollectionOwner,
  getMe,
  getQuotesOfCollection,
  bookmarkCollection,
  removeBookmarkedCollection,
} from '../lib/quotes-api.js';
import { shareCollection, shareQuote } from '../lib/share.js'

const urlParameters = new URLSearchParams(window.location.search);

if (!urlParameters.has('id')) throw new Error('Parameter \'id\' expected in url.');

const collectionIdAsText = urlParameters.get('id');
const collectionId = parseInt(collectionIdAsText, 10);

if (isNaN(collectionId)) throw new Error('Parameter \'id\' is not a number.');


const quotes = (await getQuotesOfCollection(collectionId));
const collection = (await getCollection(collectionId));

document.getElementById('name').innerText = collection.attributes.name;

let currentQuoteIndex;

if (urlParameters.has('quoteId')) {
  // Specific quote
  const quoteIdAsText = urlParameters.get('quoteId');
  const quoteId = parseInt(quoteIdAsText, 10);

  if (isNaN(collectionId)) throw new Error('Parameter \'quoteId\' is not a number.');

  const quote = quotes.find((quote) => quote.id === quoteId);

  showQuote(quote, collectionId)
} else {
  showRandomQuote();
}

function showNextQuote() {
  showQuote(quotes[(currentQuoteIndex + 1) % quotes.length], collectionId);
}

function showPreviousQuote() {
  showQuote(quotes[((currentQuoteIndex - 1 % quotes.length) + quotes.length) % quotes.length], collectionId);
}

function showRandomQuote() {
  const randomIndex = parseInt(Math.random() * quotes.length);
  showQuote(quotes[randomIndex], collectionId)
}

function showQuote(quote, collectionId) {
  const url = new URL(window.location.href);
  url.searchParams.set('id', collectionId);
  url.searchParams.set('quoteId', quote.id);
  window.history.replaceState({}, quote.id, url);
  currentQuoteIndex = quotes.indexOf(quote);
  if(currentQuoteIndex < 0) return;
  document.querySelector('#index').innerText = `${currentQuoteIndex + 1}`;
  document.querySelector('#id').innerText = `${quote.id}`;
  document.querySelector('#content').innerText = `${quote.attributes.content}`;
  document.querySelector('#quoted').innerText = `${quote.attributes.quoted}`;
}

function editQuote() {
  window.location.href = `${window.location.origin}/edit-quote/?id=${quotes[currentQuoteIndex].id}`
}

function addQuote() {
  window.location.href = `${window.location.origin}/new-quote/?collectionId=${collectionId}`
}

document.querySelector('body').addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowRight':
      showNextQuote();
      break;

    case 'ArrowLeft':
      showPreviousQuote();
      break;

    default:
      break;
  }
});

document.getElementById('prev').addEventListener('click', showPreviousQuote);
document.getElementById('random').addEventListener('click', showRandomQuote);
document.getElementById('next').addEventListener('click', showNextQuote);

document.getElementById('share').addEventListener('click', toggleModal);
document.querySelector('.modal-container').addEventListener('click', toggleModal);

document.querySelector('#share-quote').addEventListener('click', async (event) => {
  event.stopPropagation();
  await shareQuote(collection.id, quotes[currentQuoteIndex]);
  toggleModal();
});

document.querySelector('#share-collection').addEventListener('click', async (event) => {
  event.stopPropagation();
  await shareCollection(collection);
  toggleModal();
});

function toggleModal() {
  document.querySelector('.modal-container').toggleAttribute('visible');
}


/* BOOKMARKING */

function updateBookmarkButtons(roles) {
  if(roles.isModerator || roles.isOwner || !isAuthenticated()) return;
  
  if (roles.isFollower) {
    document.getElementById('add-bookmark').classList.add('hidden');
    document.getElementById('remove-bookmark').classList.remove('hidden');
  } else {
    document.getElementById('add-bookmark').classList.remove('hidden');
    document.getElementById('remove-bookmark').classList.add('hidden');
  }
}

function addBookmark() {
  document.getElementById('add-bookmark').classList.add('hidden');
  document.getElementById('remove-bookmark').classList.remove('hidden');
  bookmarkCollection(collectionId, getToken());
}

function removeBookmark() { 
  document.getElementById('add-bookmark').classList.remove('hidden');
  document.getElementById('remove-bookmark').classList.add('hidden');
  removeBookmarkedCollection(collectionId, getToken())
}

document.getElementById('add-bookmark').addEventListener('click', addBookmark);
document.getElementById('remove-bookmark').addEventListener('click', removeBookmark);

const myRole = await getMyRoleForCollection(collectionId, getToken());
updateBookmarkButtons(myRole);

/* MODERATORS MENU */

showModeratorsMenu();

async function showModeratorsMenu() {
  const myRole = await getMyRoleForCollection(collectionId, getToken());

  if (myRole.isModerator || myRole.isOwner) {
    const openSettingsButton = `
      <button id="add" class="open-settings-button icon">
        <span class="icon-add"></span>
      </button>
      
      <button id="edit" class="open-settings-button icon">
        <span class="icon-edit"></span>
      </button>
    `;
    document.querySelector('.moderators-menu').innerHTML = openSettingsButton;
    document.querySelector('.profile').addEventListener('click', () => window.location.href = '/account-settings/');
    document.getElementById('edit').addEventListener('click', editQuote);
    document.getElementById('add').addEventListener('click', addQuote);
  }
}