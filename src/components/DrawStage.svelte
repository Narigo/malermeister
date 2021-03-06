<script lang="ts">
  import type { DrawResults } from "./Room.svelte";

  const stages = ["start", "drawing", "waiting", "done"] as const;
  type DrawStage = typeof stages[number];

  export let done: (results: DrawResults) => void;

  let stage: DrawStage = "start";

  function enterDrawing() {
    stage = "drawing";
  }

  function submitDrawing() {
    stage = "waiting";
  }

  function doneWaiting() {
    stage = "done";
  }
</script>

{#if stage === "start"}
  <p>Prepare yourself to draw!</p>
  <button on:click={enterDrawing}>Continue</button>
{:else if stage === "drawing"}
  <p>There will be a canvas to draw on</p>
  <button on:click={submitDrawing}>Done!</button>
{:else if stage === "waiting"}
  <p>Waiting for everyone to finish their drawing!</p>
  <button on:click={doneWaiting}>Done!</button>
{:else}
  <p>Everyone is done drawing! Let's jump into the next phase!</p>
  <button on:click={done}>Done!</button>
{/if}
