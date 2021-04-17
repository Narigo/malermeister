<script lang="ts">
  export let active: boolean = false;
  export let color: string;
  export let height: number;
  export let strokeWidth: number;
  export let width: number;
</script>

<svg
  class={active ? "active" : ""}
  {width}
  {height}
  on:click
  viewBox="0 0 100 100"
>
  <path
    class="highlight"
    d="M 55 0 L 50 30 L 60 60 L 80 35 L 90 0 L 55 0"
    stroke-width="5"
    stroke-linecap="round"
    fill="none"
    stroke="#ff0"
    vector-effect="non-scaling-stroke"
  />
  <path
    class="highlight"
    d="M 25 75 L 60 60"
    stroke-width={strokeWidth + 4}
    stroke-linecap="round"
    fill="none"
    stroke="#ff0"
    vector-effect="non-scaling-stroke"
  />
  <path
    d="M 25 75 L 60 60"
    stroke-width={strokeWidth}
    stroke-linecap="round"
    fill="none"
    stroke={color}
    vector-effect="non-scaling-stroke"
  />
  <path
    d="M 55 0 L 50 30 L 80 35 L 90 0 L 55 0"
    stroke-width="1"
    stroke-linecap="round"
    fill="#000"
    stroke="#000"
    vector-effect="non-scaling-stroke"
  />
  <path
    d="M 60 60 L 50 30 L 80 35 L 60 60"
    stroke-width="1"
    stroke-linecap="round"
    stroke-linejoin="miter"
    fill={color}
    stroke={color}
    vector-effect="non-scaling-stroke"
  />
</svg>

<style>
  .active {
    /* border-bottom: 1px solid #f00; */
  }
  .highlight {
    visibility: hidden;
  }

  .active .highlight {
    box-shadow: 0 0 5px #ff0;
    visibility: visible;
  }
</style>
