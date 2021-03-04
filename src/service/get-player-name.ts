import randomOf from "./random-of";

const first = ["Anna", "Caroline", "Kurt", "Robert", "Xaver", "Yvonne"];
const last = [
  "Bettler",
  "Dorfner",
  "Huber",
  "Meier",
  "Schmidt",
  "Tagedieb",
  "Unterholzner",
];

export default function getPlayerName() {
  return `${randomOf(first)} ${randomOf(last)}`;
}
