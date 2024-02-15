import { Themes } from './constants';

export type User = {
  id: string
  username: string,
  email: string,
  displayName: string,
  profilePicture: string,
  provider: string,
  confirmed: boolean,
  blocked: boolean,
  createdAt: string,
  updatedAt: string,
}

export type PotentialModerator = User & { isModerator: boolean };

export type Quote = {
  content: string,
  quoted: string,
}

export type Collection = {
  id: string,
  name: string,
  theme: Themes,
  quotes: Array<Quote>,
  owner: string,
  followers: Array<User>
  moderators: Array<User>
}

export const emptyCollection: Collection = {
  id: '',
  followers: [],
  moderators: [],
  name: 'loading...',
  owner: 'loading...',
  quotes: [],
  theme: Themes.BLUE_GRADIENT  
}