<script lang="ts">
  import getRoomName from "$service/get-room-name";
  import { onMount } from "svelte";

  let randomRoomName: string;

  onMount(() => {
    randomRoomName = getRoomName();
  });
</script>

<main>
  <h1>Hello world!</h1>

  <p>
    Jump into a room, for example <a href={`./game/${randomRoomName}`}
      >{randomRoomName}</a
    >.
  </p>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 4rem auto;
    max-width: 14rem;
  }

  p {
    max-width: 14rem;
    margin: 2rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
</style>
