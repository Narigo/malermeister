<script lang="ts">
  import type { Player } from "$service/player-store";
  import drawings from "$service/drawing-store";
  import playerStore from "$service/player-store";

  const players = $playerStore.players
    .map((p) => ({
      ...p,
      score: scoresForPlayer(p),
    }))
    .sort((a, b) => b.score - a.score);

  function scoresForPlayer(player: Player): number {
    return $drawings.reduce((sum, drawing) => {
      const selection = drawing.selected.find((s) => s.player === player);
      const hasCorrectGuess = drawing.prompt === selection.prompt;
      const guess = drawing.guesses.find((guess) => guess.player === player);
      const ownPromptGuessed = drawing.selected.filter(
        (s) => s.prompt === guess.prompt
      ).length;
      return sum + (hasCorrectGuess ? 1000 : 0) + ownPromptGuessed * 250;
    }, 0);
  }
</script>

<ul>
  {#each players as player}
    <li>{player.name}: {player.score}</li>
  {/each}
</ul>
