import type { Themes } from './constants';

export type User = {
  id: string
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
  id: string | undefined
  name: string,
  theme: Themes,
  quotes: Array<Quote>,
  ownerId: string,
  followers: Array<Follower>
  moderators: Array<User>
}