import { getOwnUser } from "./api";

export async function removeAUthenticatedStatus() {
  localStorage.removeItem('token');
}

export async function isAuthenticated() {
  const token = localStorage.getItem('token');
  if (token === null) return false;
  try {
    await getOwnUser(token);
    return true;
  } catch {
    return false;
  }
}

export function getLocalToken() {
  const token = localStorage.getItem('token');
  if(!token) return '';
  return token;
}