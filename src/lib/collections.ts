import { writable } from 'svelte/store';

const collections = writable<Array<unknown>>();

export default collections;