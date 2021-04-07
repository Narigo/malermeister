<script lang="ts">
  export let color: string;
  export let height: number;
  export let strokeWidth: number;
  export let width: number;
</script>

<svg {width} {height} viewBox="0 0 100 100" on:click>
  <path
    d="M 25 75 L 75 50"
    stroke-width={strokeWidth}
    stroke-linecap="round"
    fill="none"
    stroke={color}
    vector-effect="non-scaling-stroke"
  />
</svg>
