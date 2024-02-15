import { Themes } from './constants';

export type User = {
  id: string
  username: string,
  email: string,
  displayName: string,
  profilePicture: string,
}

export type PotentialModerator = User & { isModerator: boolean };

export type Quote = {
  quote: string,
  quoted: string,
}

export type Collection = {
  id: string | undefined
  name: string,
  theme: Themes,
  quotes: Array<Quote>,
  owner: string,
  followers: Array<Follower>
  moderators: Array<User>
}

export const emptyCollection: Collection = {
  id: undefined,
  followers: [],
  moderators: [],
  name: 'loading...',
  owner: 'loading...',
  quotes: [],
  theme: Themes.BLUE_GRADIENT  
}