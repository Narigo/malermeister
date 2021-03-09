import { writable } from "svelte/store";
import generatePlayer from "./generate-player";
export type Player = { name: string };

const players = writable<{ players: Player[]; currentPlayer: Player }>({
  players: [],
  currentPlayer: generatePlayer(),
});

export default players;
