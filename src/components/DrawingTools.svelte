<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Pencil from "./Pencil.svelte";

  const dispatch = createEventDispatcher();

  const pick = (color: string) => () =>
    dispatch("change", { strokeStyle: color });
  const pickThickness = (thickness: number) => () =>
    dispatch("change", { lineWidth: thickness });
</script>

<div class="picker">
  <div class="colors">
    <span class="black" on:click={pick("rgb(0, 0, 0)")} />
    <span class="red" on:click={pick("rgb(255, 0, 0)")} />
    <span class="green" on:click={pick("rgb(0, 255, 0)")} />
    <span class="blue" on:click={pick("rgb(0, 0, 255)")} />
    <span class="white" on:click={pick("rgb(255, 255, 255)")} />
  </div>
  <div class="thickness">
    <Pencil
      on:click={pickThickness(1)}
      height={25}
      width={25}
      strokeWidth={1}
      color="#000000"
    />
    <Pencil
      on:click={pickThickness(2)}
      height={25}
      width={25}
      strokeWidth={2}
      color="#000000"
    />
    <Pencil
      on:click={pickThickness(5)}
      height={25}
      width={25}
      strokeWidth={5}
      color="#000000"
    />
  </div>
</div>

<style>
  div.picker {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 15px #000;
    justify-content: space-between;
    gap: 25px;
    margin: 25px auto;
    padding: 25px 25px;
    width: 225px;
  }

  div.colors,
  div.thickness {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  span {
    border: 1px solid #000;
    box-sizing: border-box;
    height: 25px;
    width: 25px;
  }
  .black {
    background-color: #000;
    border-color: #fff;
  }
  .red {
    background-color: #f00;
  }
  .green {
    background-color: #0f0;
  }
  .blue {
    background-color: #00f;
  }
  .white {
    background-color: #fff;
  }
</style>
