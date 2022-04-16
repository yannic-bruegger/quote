import { API_URL } from './config.js';

export async function getQuotesOfCollection(id) {
  let reply = await fetch(`${API_URL}/collections/${id}?populate=quotes`);
  let data = await reply.json();
  return data;
}