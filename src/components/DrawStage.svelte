<script lang="ts" context="module">
  const stages = ["start", "drawing", "waiting", "done"] as const;
  type DrawStage = typeof stages[number];
</script>

<script lang="ts">
  import type { Drawing, DrawingPrompt } from "../service/drawing-store";
  import drawings from "../service/drawing-store";
  import generatePrompt from "../service/generate-prompt";
  import playerStore from "../service/player-store";
  import DrawCanvas from "./DrawCanvas.svelte";

  export let done: () => void;

  let stage: DrawStage = "start";
  let prompt: string = generatePrompt();
  let getDrawing: () => ImageData;

  $: if (stage === "waiting") {
    $playerStore.players.forEach((player) => {
      setTimeout(() => {
        const prompt = generatePrompt();
        addDrawing({
          author: player,
          guesses: [],
          prompt,
          selected: [{ player, prompt }],
        });
      }, Math.random() * 200);
    });
  }

  function nextStage() {
    stage = stages[(stages.findIndex((s) => s === stage) + 1) % stages.length];
  }

  function saveDrawing() {
    const imageData = getDrawing();
    console.log(imageData);

    nextStage();
  }

  function addDrawing(drawing: DrawingPrompt) {
    const drawingOfPlayer = $drawings.findIndex(
      (d) => d.author === drawing.author
    );
    console.log("addDrawing(", drawing, ")", drawingOfPlayer, $drawings.length);
    $drawings = [...$drawings, drawing];
  }
</script>

<ul>
  {#each $drawings as drawing}
    <li>{drawing.prompt} by {drawing.author.name}</li>
  {/each}
</ul>

{#if stage === "start"}
  <p>Prepare yourself to draw!</p>
  <button on:click={nextStage}>Continue</button>
{:else if stage === "drawing"}
  <DrawCanvas bind:getDrawing {prompt} initialLineWidth={5} />
  <button on:click={saveDrawing}>Done drawing!</button>
{:else if stage === "waiting"}
  <p>Waiting for everyone to finish their drawing!</p>
  <button on:click={nextStage}>Done waiting!</button>
{:else}
  <p>Everyone is done drawing! Let's jump into the next phase!</p>
  <button on:click={done}>Done!</button>
{/if}
