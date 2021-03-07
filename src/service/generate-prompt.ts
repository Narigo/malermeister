import randomOf from "./random-of";

export default function generatePrompt() {
  return `${randomOf([
    "hüpfende",
    "tanzende",
    "essende",
    "raufende",
    "betrunkene",
  ])} ${randomOf([
    "Clowns",
    "Eisbären",
    "Lamas",
    "Tiger",
    "Zebras",
  ])} ${randomOf(["", "auf Rädern", "im Sterben", "mit Hüten"])}`.trim();
}
