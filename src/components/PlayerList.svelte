<script lang="ts">
  import generatePlayer from "$service/generate-player";
  import playerStore from "$service/player-store";

  playerJoined();

  function playerJoined() {
    setTimeout(() => {
      if ($playerStore.players.length < 5) {
        $playerStore = {
          ...$playerStore,
          players: [...$playerStore.players, generatePlayer()],
        };
        playerJoined();
      }
    }, Math.floor(Math.random() * 200 + 100));
  }
</script>

<h2>Players</h2>
<ul>
  {#each $playerStore.players as player}
    <li>{player.name}</li>
  {/each}
</ul>
