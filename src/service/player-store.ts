import { writable } from "svelte/store";
import generatePlayer from "./generate-player";
export type Player = { name: string };

const currentPlayer = generatePlayer();
const players = writable<{ players: Player[]; currentPlayer: Player }>({
  players: [currentPlayer],
  currentPlayer,
});

export default players;
