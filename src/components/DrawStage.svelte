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
        updateDrawing({
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

  function updateDrawing(drawing: Drawing) {
    const drawingOfPlayer = $drawings.findIndex(
      (d) => d.author === drawing.author
    );
    $drawings = [
      ...$drawings.slice(0, drawingOfPlayer),
      drawing,
      ...$drawings.slice(drawingOfPlayer + 1),
    ];
  }
</script>

{#if stage === "start"}
  <p>Prepare yourself to draw!</p>
  <button on:click={nextStage}>Continue</button>
{:else if stage === "drawing"}
  <p>There will be a canvas to draw '{prompt}'</p>
  <button
    on:click={() => {
      updateDrawing({
        author: $playerStore.currentPlayer,
        prompt,
        guesses: [],
      });
      nextStage();
    }}>Done drawing!</button
  >
{:else if stage === "waiting"}
  <p>Waiting for everyone to finish their drawing!</p>
  <button on:click={nextStage}>Done waiting!</button>
{:else}
  <p>Everyone is done drawing! Let's jump into the next phase!</p>
  <button on:click={done}>Done!</button>
{/if}
