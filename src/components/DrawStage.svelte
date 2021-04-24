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
    const drawingIndex = $drawings.findIndex(
      (d) => d.author === $playerStore.currentPlayer
    );
    const existingPrompt = $drawings[drawingIndex];
    $drawings = [
      ...$drawings.slice(0, drawingIndex),
      {
        ...existingPrompt,
        drawing: imageData,
      },
      ...$drawings.slice(drawingIndex + 1),
    ];
    nextStage();
  }

  function addDrawing(drawing: DrawingPrompt) {
    const drawingOfPlayer = $drawings.findIndex(
      (d) => d.author === drawing.author
    );
    console.log("addDrawing(", drawing, ")", drawingOfPlayer, $drawings.length);
    $drawings = [...$drawings, drawing];
  }

  function getDrawingAsImage(
    drawing: DrawingPrompt | Drawing
  ): HTMLImageElement {
    const imageData = (drawing as Drawing).drawing;
    if (!imageData) {
      console.log("no imageData for", drawing);
      return new Image();
    }
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);

    var image = new Image(imageData.width, imageData.height);
    image.src = canvas.toDataURL();
    return image;
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
  {#each $drawings as drawing}
    {@html getDrawingAsImage(drawing).outerHTML}
  {/each}
  <button on:click={nextStage}>Done waiting!</button>
{:else}
  <p>Everyone is done drawing! Let's jump into the next phase!</p>
  <button on:click={done}>Done!</button>
{/if}
