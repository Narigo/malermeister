import getPlayerName from "./get-player-name";

export default function generatePlayer() {
  return { name: getPlayerName() };
}
