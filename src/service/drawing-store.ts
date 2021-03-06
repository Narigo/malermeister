import { writable } from "svelte/store";
import type { Player } from "./player-store";
export type Guess = { prompt: string; player: Player };
export type DrawingPrompt = {
  prompt: string;
  author: Player;
  guesses: Guess[];
  selected: Guess[];
};
export type Drawing = DrawingPrompt & {
  drawing: ImageData;
};

const drawings = writable<(DrawingPrompt | Drawing)[]>([]);

export default drawings;
