import { API_URL } from '../config.js';

export async function getQuotesOfCollection(id) {
  let reply = await fetch(`${API_URL}/collections/${id}?populate=quotes`);
  let data = await reply.json();
  return data;
}

export async function getMyCollections(token) {
  let reply = await fetch(`${API_URL}/collections?populate=quotes`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  let data = await reply.json();
  console.log(data);
  return data;
}