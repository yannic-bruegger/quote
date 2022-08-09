export function removeUsersFromCollection(allUsers, usersToRemove) {
  const removeIds = usersToRemove.map((user) => user.id);
  return allUsers.filter(user => {
    return !removeIds.includes(user.id);
  });
}

