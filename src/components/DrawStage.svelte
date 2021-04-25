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

  $: if (stage === "start") {
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
    $drawings = [...$drawings, drawing];
  }

  function getDrawingAsImage(
    drawing: DrawingPrompt | Drawing
  ): HTMLImageElement {
    const imageData = (drawing as Drawing).drawing;
    const image = new Image();

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!imageData) {
      console.log("no imageData for", drawing);
      canvas.width = 100;
      canvas.height = 100;
      ctx.fillStyle = `rgb(${Math.round(Math.random() * 255)},${Math.round(
        Math.random() * 255
      )},${Math.round(Math.random() * 255)})`;
      ctx.fillRect(0, 0, 100, 100);
      image.width = 100;
      image.height = 100;
    } else {
      canvas.width = imageData.width;
      canvas.height = imageData.height;
      ctx.putImageData(imageData, 0, 0);
      image.width = imageData.width;
      image.height = imageData.height;
    }

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
