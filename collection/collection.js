import { getCollection, getQuotesOfCollection } from '../lib/quotes-api.js';

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

  showQuote(quote)
} else {
  showRandomQuote();
}

function showNextQuote() {
  showQuote(quotes[(currentQuoteIndex + 1) % quotes.length]);
}

function showPreviousQuote() {
  showQuote(quotes[((currentQuoteIndex - 1 % quotes.length) + quotes.length) % quotes.length]);
}

function showRandomQuote() {
  const randomIndex = parseInt(Math.random() * quotes.length);
  showQuote(quotes[randomIndex])
}

function showQuote(quote) {
  currentQuoteIndex = quotes.indexOf(quote);
  document.querySelector('#index').innerText = `${currentQuoteIndex + 1}`;
  document.querySelector('#id').innerText = `${quote.id}`;
  document.querySelector('#content').innerText = `${quote.attributes.content}`;
  document.querySelector('#quoted').innerText = `${quote.attributes.quoted}`;
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