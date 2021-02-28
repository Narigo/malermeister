const start = ["a", "one", "the"];
const colors = ["blue", "green", "red", "yellow"];
const animals = ["bear", "deer", "monkey", "snail", "snake", "tiger", "zebra"];

function randomOf<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRoomName() {
  return `${randomOf(start)}-${randomOf(colors)}-${randomOf(animals)}`;
}
