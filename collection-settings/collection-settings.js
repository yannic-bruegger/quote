import { getCollection, getQuotesOfCollection } from '../lib/quotes-api.js';

const urlParameters = new URLSearchParams(window.location.search);

if (!urlParameters.has('id')) throw new Error('Parameter \'id\' expected in url.');

const collectionIdAsText = urlParameters.get('id');
const collectionId = parseInt(collectionIdAsText, 10);

if (isNaN(collectionId)) throw new Error('Parameter \'id\' is not a number.');

const collection = await getCollection(collectionId);

document.getElementById('name').value = collection.attributes.name;