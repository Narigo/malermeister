<script lang="ts">
  import getPlayerName from "$service/get-player-name";
  import DrawStage from "./DrawStage.svelte";

  export let name: string;

  const stages = [
    "start",
    "draw",
    "guess",
    "select",
    "rate",
    "scores",
  ] as const;
  type Stage = typeof stages[number];
  type Players = { name: string };

  let stage: Stage = "start";
  let players: Players[] = [];

  playerJoined();

  function playerJoined() {
    players = [...players, generateNewPlayer()];
    setTimeout(() => {
      if (players.length < 5) {
        playerJoined();
      }
    }, Math.floor(Math.random() * 2000));
  }

  function generateNewPlayer() {
    return { name: getPlayerName() };
  }

  function startGame() {
    stage = "draw";
  }
</script>

<h1>Room {name}</h1>

<ul>
  {#each players as player}
    <li>{player.name}</li>
  {/each}
</ul>

{#if stage === "start"}
  <h2>waiting for players to join</h2>
  <button on:click={startGame}>Start game with {players.length} players</button>
{:else if stage === "draw"}
  <DrawStage />
{:else if stage === "guess"}
  <h2>waiting for players to guess prompt</h2>
{:else if stage === "select"}
  <h2>waiting for players to select</h2>
{:else if stage === "rate"}
  <h2>waiting for players to rate prompts</h2>
{:else if stage === "scores"}
  <h2>showing scores to players</h2>
{/if}
