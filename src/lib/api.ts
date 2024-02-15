import { PUBLIC_API_URL } from '$env/static/public';
import { flatten } from './helper';
import type { Collection, Quote, User } from './types';

export async function authenticate(username: string, password: string) {
  const reply = await fetch(`${PUBLIC_API_URL}/auth/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier: username,
      password: password,
    }),
  });

  if (!reply.ok) throw Error(reply.statusText);
  const data = await reply.json();
  return data;
}

export async function getOwnUser(bearerToken: string) {
  const reply = await fetch(`${PUBLIC_API_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`
    },
  })

  if (!reply.ok) throw Error(reply.statusText);
  const data = await reply.json();
  return data;
}

export async function getCollections(bearerToken: string) {
  const reply = await fetch(`${PUBLIC_API_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`
    },
  })

  if (!reply.ok) throw Error(reply.statusText);
  const data = await reply.json();
  return data;
}

export async function getQuotesOfCollection(collectionId: string) {
  const reply = await fetch(`${PUBLIC_API_URL}/collections/${collectionId}?populate=quotes`);
  const data = (await reply.json()).data;
  return data.attributes.quotes.data;
}

export async function getSingleQuote(quoteId: string, bearerToken: string) {
  const reply = await fetch(`${PUBLIC_API_URL}/quotes/${quoteId}?populate=collection`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
  }});
  const data = (await reply.json()).data;
  return data;
}

export async function getCollection(collectionId: string, bearerToken?: string) {
  let additional = {}
  if (bearerToken) additional = { headers: { Authorization: `Bearer ${bearerToken}` }  }
  const reply = await fetch(`${PUBLIC_API_URL}/collections/${collectionId}?populate=*`, additional);
  const data = (await reply.json()).data;
  return {
    ...data.attributes,
    id: data.id,
    followers: data.attributes.followers.data.map(flatten),
    quotes: data.attributes.quotes.data.map(flatten),
    moderators: data.attributes.moderators.data.map(flatten),
    owner: flatten(data.attributes.owner.data)
  };
}

export async function getCollectionProperties(collectionId: string) {
  const reply = await fetch(`${PUBLIC_API_URL}/collections/${collectionId}?populate[0]=name&populate[1]=theme`);
  const data = (await reply.json()).data;
  
  return {
    ...data.attributes,
    id: data.id
  };
}

export async function getCollectionModerators(collectionId: string, bearerToken: string) {
  const reply = await fetch(`${PUBLIC_API_URL}/collections/${collectionId}?populate=moderators`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`
    }
  });
  const moderators = (await reply.json()).data.attributes.moderators.data;
  return moderators;
}

export async function getCollectionOwner(collectionId: string, bearerToken: string) {
  const reply = await fetch(`${PUBLIC_API_URL}/collections/${collectionId}?populate=owner`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`
    }
  });
  const owner = (await reply.json()).data.attributes.owner.data;
  return owner;
}

export async function getCollectionFollowers(collectionId: string, bearerToken: string) {
  const reply = await fetch(`${PUBLIC_API_URL}/collections/${collectionId}?populate=followers`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`
    }
  });
  const followers = (await reply.json()).data.attributes.followers.data;
  return followers;
}

export async function getUsers(bearerToken: string) {
  const reply = await fetch(`${PUBLIC_API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`
    }
  });
  const data = (await reply.json());
  return data.map((element: {id: string, attributes: unknown}) => ({id: element.id, attributes: element}));
}

export async function getUserByName(username: string, bearerToken: string) {
  const reply = await fetch(`${PUBLIC_API_URL}/users?filters[username][$eq]=${username}`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`
    }
  });
  const data = (await reply.json());
  return data.map((element: {id: string, attributes: unknown}) => ({id: element.id, attributes: element}));
}

export async function getMe(bearerToken: string) {
  const reply = await fetch(`${PUBLIC_API_URL}/users/me?populate=*`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`
    }
  });
  const data = await reply.json();
  
  return data;
}

export async function getMyCollections(bearerToken: string) {
  const reply = await fetch(`${PUBLIC_API_URL}/users/me?populate=*`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`
    }
  });
  const data = await reply.json();

  const myCollections: {owns: Array<Collection>, moderates: Array<Collection>, follows: Array<Collection>} = {
    owns: data.owns,
    moderates: data.moderates,
    follows: data.follows
  }
  
  return myCollections;
}

export async function createCollection(bearerToken: string, newCollection: Collection) {
  const reply = await fetch(`${PUBLIC_API_URL}/collections`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: newCollection
    }),
  });
  const data = await reply.json();
  return data;
}

export async function updateCollection(collectionId: string, name: string, moderatorIds: Array<string>, bearerToken: string) {
  const reply = await fetch(`${PUBLIC_API_URL}/collections/${collectionId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        name: name,
        moderators: moderatorIds,
      }
    }),
  });
  const data = await reply.json();
  return data;
}

export async function deleteCollection(collectionId: string, bearerToken: string) {
  const reply = await fetch(`${PUBLIC_API_URL}/collections/${collectionId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    }
  });
  return reply;
}

export async function updateUserInfo(userId: string, userInfo: User, bearerToken: string) {
  const reply = await fetch(`${PUBLIC_API_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      displayName: userInfo.displayName,
      email: userInfo.email,
    }),
  });
  const data = await reply.json();
  return data;
}

export async function changePassword(currentPassword: string, newPassword: string, newPasswordConfirmation: string, bearerToken: string) {
  const reply = await fetch(`${PUBLIC_API_URL}/auth/change-password`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      currentPassword: currentPassword,
      password: newPassword,
      passwordConfirmation: newPasswordConfirmation,
    }),
  });
  const result = await reply.json();
  return result;
}

export async function createQuote(bearerToken: string, quote: Quote, collectionId: number) {
  const reply = await fetch(`${PUBLIC_API_URL}/quotes`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        content: quote.content,
        quoted: quote.quoted,
        collection: collectionId,
      }
    }),
  });
  return reply;
}

export async function updateQuote(bearerToken: string, quote: Quote, quoteId: number, collectionId: number) {
  const reply = await fetch(`${PUBLIC_API_URL}/quotes/${quoteId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        content: quote.content,
        quoted: quote.quoted,
        collection: collectionId,
      }
    }),
  });
  return reply;
}

export async function deleteQuote(bearerToken: string, quoteId: number) {
  const reply = await fetch(`${PUBLIC_API_URL}/quotes/${quoteId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    }
  });
  return reply;
}

export async function bookmarkCollection(collection: Collection, user: User, bearerToken: string) {
  const collections = (await getMyCollections(bearerToken)).follows;
  const collectionIds = collections.map((collection: Collection) => collection.id);
  collectionIds.push(collection.id);

  const reply = await fetch(`${PUBLIC_API_URL}/users/${user.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        follows: collectionIds
      }),
    });
    const data = await reply.json();
    return data;
}

export async function removeBookmarkedCollection(collection: Collection, user: User, bearerToken: string) {
  const collections: Array<Collection> = (await getMyCollections(bearerToken)).follows;
  const collectionIds = collections.map((collection) => collection.id);
  const collectionIdsWithoutCollection = collectionIds.filter((id) => id !== collection.id);

  const reply = await fetch(`${PUBLIC_API_URL}/users/${user.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        follows: collectionIdsWithoutCollection
      }),
    });
    const data = await reply.json();
    return data;
}