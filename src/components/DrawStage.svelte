<script lang="ts" context="module">
  const stages = ["start", "drawing", "waiting", "done"] as const;
  type DrawStage = typeof stages[number];
</script>

<script lang="ts">
  import type { Drawing } from "$service/drawing-store";
  import drawings from "$service/drawing-store";
  import generatePrompt from "$service/generate-prompt";
  import playerStore from "$service/player-store";

  export let done: () => void;

  let stage: DrawStage = "start";
  let prompt: string = generatePrompt();

  $: if (stage === "waiting") {
    $playerStore.players.forEach((player) => {
      setTimeout(() => {
        addDrawing({
          author: player,
          guesses: [],
          prompt: generatePrompt(),
        });
      }, Math.random() * 200);
    });
  }

  function nextStage() {
    stage = stages[(stages.findIndex((s) => s === stage) + 1) % stages.length];
  }

  function addDrawing(drawing: Drawing) {
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
  <p>There will be a canvas to draw '{prompt}'</p>
  <button on:click={nextStage}>Done drawing!</button>
{:else if stage === "waiting"}
  <p>Waiting for everyone to finish their drawing!</p>
  <button on:click={nextStage}>Done waiting!</button>
{:else}
  <p>Everyone is done drawing! Let's jump into the next phase!</p>
  <button on:click={done}>Done!</button>
{/if}
