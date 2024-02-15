import { writable } from 'svelte/store';

interface User {
  id:          string;
  username:    string;
  email:       string;
  provider:    string;
  confirmed:   boolean;
  blocked:     boolean;
  createdAt:   Date;
  updatedAt:   Date;
  displayName: string;
  profilePicture: string;
}

const user = writable<User | null>(null);

export default user;