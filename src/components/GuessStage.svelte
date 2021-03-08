<script lang="ts" context="module">
  const stages = ["guess", "select", "rate"] as const;
  type GuessStage = typeof stages[number];
</script>

<script lang="ts">
  import drawings from "$service/drawing-store";

  export let done: () => void;

  let stage: GuessStage = "guess";

  function nextStage() {
    stage = stages[(stages.findIndex((s) => s === stage) + 1) % stages.length];
  }
</script>

<ul>
  {#each $drawings as drawing}
    <li>{drawing.prompt} by {drawing.author.name}</li>
  {/each}
</ul>
{#each $drawings as drawing}
  {#if stage === "guess"}
    <h2>waiting for players to guess prompt for drawing {drawing.prompt}</h2>
    <button on:click={nextStage}
      >Everyone created a guess for the drawing!</button
    >
  {:else if stage === "select"}
    <h2>waiting for players to select prompt for drawing {drawing.prompt}</h2>
    <button on:click={nextStage}>Everyone selected their guess!</button>
  {:else if stage === "rate"}
    <h2>
      waiting for players to rate prompt for drawing {drawing.prompt} by {drawing
        .author.name}
    </h2>
    <button on:click={done}>Everyone rated!</button>
  {/if}
{/each}
