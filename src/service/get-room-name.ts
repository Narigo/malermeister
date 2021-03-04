import randomOf from "./random-of";

const start = ["a", "one", "the"];
const colors = ["blue", "green", "red", "yellow"];
const animals = ["bear", "deer", "monkey", "snail", "snake", "tiger", "zebra"];

export default function getRoomName() {
  return `${randomOf(start)}-${randomOf(colors)}-${randomOf(animals)}`;
}
