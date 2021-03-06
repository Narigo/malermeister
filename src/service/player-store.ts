import { writable } from "svelte/store";
export type Players = { name: string };

const players = writable([]);

export default players;
