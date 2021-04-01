<script lang="ts" context="module">
  export type DrawResults = {};

  const stages = ["start", "draw", "guess", "scores"] as const;
  type Stage = typeof stages[number];
</script>

<script lang="ts">
  import playerStore from "$service/player-store";
  import DrawStage from "./DrawStage.svelte";
  import GuessStage from "./GuessStage.svelte";
  import PlayerList from "./PlayerList.svelte";
  import ScoreStage from "./ScoreStage.svelte";

  export let name: string;

  let stage: Stage = "start";

  function startGame() {
    stage = "draw";
  }

  function nextStage() {
    console.log("current stage =", stage);
    stage = stages[(stages.findIndex((s) => s === stage) + 1) % stages.length];
    console.log("next stage =", stage);
  }
</script>

<h1>Room {name}</h1>
<div>
  <section>
    {#if stage === "start"}
      <h2>waiting for players to join</h2>
      <button on:click={startGame}
        >Start game with {$playerStore.players.length}
        players</button
      >
    {:else if stage === "draw"}
      <DrawStage done={nextStage} />
    {:else if stage === "guess"}
      <GuessStage done={nextStage} />
    {:else if stage === "scores"}
      <ScoreStage />
    {/if}
  </section>
  <section class="players"><PlayerList /></section>
</div>

<style>
  div {
    display: flex;
    width: 100%;
  }

  section {
    flex-grow: 1;
  }

  section.players {
    max-width: 250px;
  }
</style>
