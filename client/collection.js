import { getQuotesOfCollection } from './quotes-api.js';

const urlParameters = new URLSearchParams(window.location.search);

if (!urlParameters.has('id')) throw new Error('Parameter \'id\' expected in url.');

const collectionIdAsText = urlParameters.get('id');
const collectionId = parseInt(collectionIdAsText, 10);

if (isNaN(collectionId)) throw new Error('Parameter \'id\' is not a number.');

try {
  let data = (await getQuotesOfCollection(collectionId)).data;

  document.getElementById('name').innerText = data.attributes.name;

  const quotes = data.attributes.quotes.data;

  let quoteToShow;
  if (urlParameters.has('quoteId')) {
    // Specific quote
    const quoteIdAsText = urlParameters.get('quoteId');
    const quoteId = parseInt(quoteIdAsText, 10);

    if (isNaN(collectionId)) throw new Error('Parameter \'quoteId\' is not a number.');

    let quote = quotes.find((quote) => quote.id === quoteId);

    quoteToShow = quote;
  } else {
    // Random quote
    const randomIndex = parseInt(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteToShow = randomQuote;
  }

  document.querySelector('#random-quote #id').innerText = `${quoteToShow.id}`;
  document.querySelector('#random-quote #content').innerText = `${quoteToShow.attributes.content}`;
  document.querySelector('#random-quote #quoted').innerText = `${quoteToShow.attributes.quoted}`;

} catch(e) {
  console.error('Unable to get or parse data from collection.', e);
}


