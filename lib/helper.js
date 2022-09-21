import { getToken } from './auth.js';
import { getCollection, getMe } from './quotes-api.js';

export function removeUsersFromCollection(allUsers, usersToRemove) {
  const removeIds = usersToRemove.map((user) => user.id);
  return allUsers.filter(user => {
    return !removeIds.includes(user.id);
  });
}

function isParticipantInCollection(collections, collectionId) {
  if(!collections) return false;
  return collections.find((collection) => collection.id === collectionId) != undefined;
}

export async function getMyRoleForCollection(collectionId, token) {
  const me = await getMe(getToken());

  return {
    isOwner: isParticipantInCollection(me.owns, collectionId),
    isModerator: isParticipantInCollection(me.moderates, collectionId),
    isFollower: isParticipantInCollection(me.follows, collectionId)
  }
}