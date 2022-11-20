import { getToken } from '../lib/auth.js';
import { createQuote, getMyCollections } from '../lib/quotes-api.js';

// ===================
// WARNING IM DANGEROUS!!!!
// I will generate new quotes form the quote array and push them to my Collection!
// ===================

const quote = ['Im a test Quote! <br>- Me'];
const classicQuotes = [];

// Split single Strings into array
// quote.forEach((obj) => {
//   if (obj.includes(' <br>- ')) {
//     classicQuotes.push(obj.split(' <br>- '))
//   } 
//   else if (obj.includes(' <br />- ')) {
//     classicQuotes.push(obj.split(' <br />- '))
//   } 
//   else if (obj.includes('<br />- ')) {
//     classicQuotes.push(obj.split('<br />- '))
//   } 
//   else if (obj.includes(' </br>- ')) {
//     classicQuotes.push(obj.split(' </br>- '))
//   }
//   else if (obj.includes('</br>- ')) {
//     classicQuotes.push(obj.split('</br>- '))
//   } 
//   else if (obj.includes(' <br /> -')) {
//     classicQuotes.push(obj.split(' <br /> -'))
//   } 
//   else if (obj.includes('<br />-')) {
//     classicQuotes.push(obj.split('<br />-'))
//   } 
//   else if (obj.includes('<br /> - ')) {
//     classicQuotes.push(obj.split('<br /> - '))
//   } 
//   else if (obj.includes('<br />')) {
//     classicQuotes.push(obj.split('<br />'))
//   }
//   else {
//     console.log(obj);
//   }
// });

// console.log(`Quotes: ${quote.length}`);
// console.log(`C-Quotes: ${classicQuotes.length}`);
// // console.log(classicQuotes);


// async function tryCreateQuote(data) {
//   const collection = document.querySelector('#collection').value;
//   const content = data[0];
//   const quoted = data[1];
//   const quote = await createQuote(getToken(), {content, quoted, collection});
//   console.log("added quote");
// }

// document.querySelector('#create-quote').addEventListener('submit', (event) => {
//   event.preventDefault();
//   classicQuotes.forEach((obj) => {
//     tryCreateQuote(obj);
//   });
// });

// const reply = await getMyCollections(getToken());

// for (const collection of (reply.owns.concat(reply.moderates))) {
//   const option = document.createElement('option');
//   option.value = collection.id;
//   option.innerText = collection.name;
//   document.querySelector('#collection').appendChild(option);
// }

// const urlParameters = new URLSearchParams(window.location.search);
// const collectionId = parseInt(urlParameters.get('collectionId'), 10);

// if (urlParameters.has('collectionId')) {
//   document.getElementById('collection').value = collectionId;
//   console.log("value", document.getElementById('collection').value);
// }