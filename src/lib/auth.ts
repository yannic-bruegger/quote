import { error } from "@sveltejs/kit";
import { getOwnUser } from "./api";

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
  if(!token) throw new Error('Could not read toaken from local storage.')
  return token;
}