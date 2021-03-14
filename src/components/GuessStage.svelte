<script lang="ts" context="module">
  const stages = ["guess", "select", "rate"] as const;
  type GuessStage = typeof stages[number];
</script>

<script lang="ts">
  import type { Drawing } from "$service/drawing-store";
  import type { Player } from "$service/player-store";
  import drawings from "$service/drawing-store";
  import generatePrompt from "$service/generate-prompt";
  import playerStore from "$service/player-store";

  export let done: () => void;

  let stage: GuessStage = "guess";
  let currentDrawingIndex = 0;
  let drawing: Drawing = $drawings[currentDrawingIndex];

  function addGuesses() {
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
    drawing = $drawings[currentDrawingIndex];
    stage = "select";
  }

  function selectPrompt(prompt: string, player: Player) {
    return () => {
      const index = $drawings.findIndex((d) => d === drawing);
      const selectedIndex = drawing.selected.findIndex(
        (g) => g.player === player
      );

      $drawings = [
        ...$drawings.slice(0, index),
        {
          ...drawing,
          selected: [
            ...drawing.selected.slice(0, selectedIndex),
            { prompt, player },
            ...drawing.selected.slice(selectedIndex + 1),
          ],
        },
        ...$drawings.slice(index + 1),
      ];

      drawing = $drawings[index];

      const allSelected = $playerStore.players.length === drawing.selected.length;

      if (allSelected) {
        stage = "rate";
      }
    };
  }

  function ratePrompts() {
    currentDrawingIndex = currentDrawingIndex + 1;
    if ($drawings.length <= currentDrawingIndex) {
      return done();
    }
    drawing = $drawings[currentDrawingIndex];
    stage = "guess";
  }
</script>

<ul>
  {#each $drawings as drawing}
    <li>{drawing.prompt} by {drawing.author.name}</li>
  {/each}
</ul>
{#if stage === "guess"}
  <h2>
    waiting for players to guess prompts for drawing {drawing.prompt} by {drawing
      .author.name}
  </h2>
  <button on:click={addGuesses}
    >Add guesses for {drawing.prompt} for all randomly</button
  >
{:else if stage === "select"}
  <h2>
    waiting for players to select prompt for drawing {drawing.prompt} by {drawing
      .author.name}
  </h2>
  {#each $playerStore.players as player}
    <h3>Set a guess of a prompt for {player.name}</h3>
    <ul>
      {#each drawing.guesses as guess}
        <li>
          <button on:click={selectPrompt(guess.prompt, player)}
            >{guess.prompt}</button
          >
        </li>
      {/each}
    </ul>
  {/each}
{:else if stage === "rate"}
  <h2>
    waiting for players to rate prompt for drawing {drawing.prompt} by {drawing
      .author.name}
  </h2>
  <button on:click={ratePrompts}>Everybody rated</button>
{/if}
