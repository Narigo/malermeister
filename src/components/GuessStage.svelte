<script lang="ts" context="module">
  const stages = ["guess", "select", "rate"] as const;
  type GuessStage = typeof stages[number];
</script>

<script lang="ts">
  import type { Drawing } from "$service/drawing-store";
  import drawings from "$service/drawing-store";
  import generatePrompt from "$service/generate-prompt";
  import playerStore from "$service/player-store";

  export let done: () => void;

  let stage: GuessStage = "guess";

  function addGuesses(drawing: Drawing) {
    return () => {
      const index = $drawings.findIndex((d) => d === drawing);
      $drawings = [
        ...$drawings.slice(0, index),
        {
          ...drawing,
          guesses: $playerStore.players.map((p) => ({
            player: p,
            prompt: generatePrompt(),
          })),
        },
        ...$drawings.slice(index + 1),
      ];
      stage = "select";
    };
  }

  function selectPrompt(drawing: Drawing) {
    return () => {
      stage = "rate";
    };
  }

  function ratePrompts(drawing: Drawing) {
    return () => {
      if (drawing === $drawings[$drawings.length - 1]) {
        return done();
      }
      stage = "guess";
    };
  }
</script>

<ul>
  {#each $drawings as drawing}
    <li>{drawing.prompt} by {drawing.author.name}</li>
  {/each}
</ul>
{#each $drawings as drawing}
  {#if stage === "guess"}
    <h2>
      waiting for players to guess prompts for drawing {drawing.prompt} by {drawing
        .author.name}
    </h2>
    <button on:click={addGuesses(drawing)}
      >Add guesses for {drawing.prompt}</button
    >
  {:else if stage === "select"}
    <h2>
      waiting for players to select prompt for drawing {drawing.prompt} by {drawing
        .author.name}
    </h2>
    <button on:click={selectPrompt(drawing)}
      >Everyone selected their guess!</button
    >
  {:else if stage === "rate"}
    <h2>
      waiting for players to rate prompt for drawing {drawing.prompt} by {drawing
        .author.name}
    </h2>
    <button on:click={ratePrompts(drawing)}>Everybody rated</button>
  {/if}
{/each}
