import { writable } from "svelte/store";
export type Player = { name: string };

const players = writable<{ players: Player[]; currentPlayer: Player }>({
  players: [],
  currentPlayer: null,
});

export default players;
