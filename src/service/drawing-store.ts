import { writable } from "svelte/store";
import type { Player } from "./player-store";
export type Guess = { prompt: string; player: Player };
export type Drawing = { prompt: string; author: Player; guesses: Guess[], selected: Guess[] };

const drawings = writable<Drawing[]>([]);

export default drawings;
