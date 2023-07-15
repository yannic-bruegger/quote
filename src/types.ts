import type { Themes } from './constants';

export type User = {
  username: string,
  email: string,
  displayName: string,
  profilePicture: string,
}

export type Follower = User & { isModerator: boolean };

export type Quote = {
  quote: string,
  quoted: string,
}

export type Collection = {
  name: string,
  theme: Themes,
  quotes: Array<Quote>,
  followers: Array<Follower>
}