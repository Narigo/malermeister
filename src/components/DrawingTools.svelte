<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const pick = (color: string) => () =>
    dispatch("change", { strokeStyle: color });
  const pickThickness = (thickness: number) => () =>
    dispatch("change", { lineWidth: thickness });
</script>

<div>
  <span class="black" on:click={pick("rgb(0, 0, 0)")} />
  <span class="red" on:click={pick("rgb(255, 0, 0)")} />
  <span class="green" on:click={pick("rgb(0, 255, 0)")} />
  <span class="blue" on:click={pick("rgb(0, 0, 255)")} />
  <span class="white" on:click={pick("rgb(255, 255, 255)")} />
  <span on:click={pickThickness(1)}>thin</span>
  <span on:click={pickThickness(2)}>normal</span>
  <span on:click={pickThickness(5)}>bold</span>
</div>

<style>
  div {
    display: flex;
    align-items: center;
    box-shadow: 0 0 25px #000;
    justify-content: space-between;
    margin: 25px auto;
    padding: 25px 25px;
    width: 225px;
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
