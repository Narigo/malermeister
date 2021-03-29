<script lang="ts">
  import generatePlayer from "$service/generate-player";
  import playerStore from "$service/player-store";

  playerJoined();

  function playerJoined() {
    setTimeout(() => {
      $playerStore = {
        ...$playerStore,
        players: [...$playerStore.players, generatePlayer()],
      };
      if ($playerStore.players.length < 5) {
        playerJoined();
      }
    }, Math.floor(Math.random() * 200 + 100));
  }
</script>

<p>Welcome, {$playerStore.currentPlayer.name}</p>
<ul>
  {#each $playerStore.players as player}
    <li>{player.name}</li>
  {/each}
</ul>
