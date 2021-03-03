<script lang="ts">
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

  let stage: Stage = "start";
</script>

<h1>Room {name}</h1>

{#if stage === "start"}
  <h2>waiting for players to join</h2>
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
