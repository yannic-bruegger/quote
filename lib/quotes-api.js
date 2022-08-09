import { API_URL } from '../config.js';

export async function getQuotesOfCollection(collectionId) {
  const reply = await fetch(`${API_URL}/collections/${collectionId}?populate=quotes`);
  const data = (await reply.json()).data;
  return data.attributes.quotes.data;
}

export async function getCollection(collectionId) {
  const reply = await fetch(`${API_URL}/collections/${collectionId}`);
  const data = (await reply.json()).data;
  return data;
}

export async function getCollectionModerators(collectionId, token) {
  const reply = await fetch(`${API_URL}/collections/${collectionId}?populate=moderators`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const moderators = (await reply.json()).data.attributes.moderators.data;
  return moderators;
}

export async function getCollectionOwner(collectionId, token) {
  const reply = await fetch(`${API_URL}/collections/${collectionId}?populate=owner`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const owner = (await reply.json()).data.attributes.owner.data;
  return owner;
}

export async function getCollectionFollowers(collectionId, token) {
  const reply = await fetch(`${API_URL}/collections/${collectionId}?populate=followers`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const followers = (await reply.json()).data.attributes.followers.data;
  return followers;
}

export async function getUsers(token) {
  const reply = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = (await reply.json());
  return data;
}

export async function getMe(token) {
  let reply = await fetch(`${API_URL}/users/me?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await reply.json();

  let myCollections = {
    "owns": data.owns,
    "moderates": data.moderates,
    "follows": data.follows
  }
  
  return myCollections;
}

export async function getMyCollections(token) {
  let reply = await fetch(`${API_URL}/users/me?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await reply.json();

  let myCollections = {
    "owns": data.owns,
    "moderates": data.moderates,
    "follows": data.follows
  }
  
  return myCollections;
}

export async function createCollection(token, name) {
  const reply = await fetch(`${API_URL}/collections`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        name: name
      }
    }),
  });
  const data = await reply.json();
  return data;
}

export async function createQuote(token, data) {
  const reply = await fetch(`${API_URL}/quotes`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        content: data.content,
        quoted: data.quoted,
        collection: data.collection,
      }
    }),
  });
  const result = await reply.json();
  return result;
}