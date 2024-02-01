import { writable } from 'svelte/store';

interface User {
  id:          number;
  username:    string;
  email:       string;
  provider:    string;
  confirmed:   boolean;
  blocked:     boolean;
  createdAt:   Date;
  updatedAt:   Date;
  displayname: string;
}

const user = writable<User | null>(null);

export default user;