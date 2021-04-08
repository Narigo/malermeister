<script lang="ts">
  export let color: string;
  export let height: number;
  export let strokeWidth: number;
  export let width: number;
</script>

<svg {width} {height} viewBox="0 0 100 100" on:click>
  <path
    d="M 25 75 L 60 60"
    stroke-width={strokeWidth}
    stroke-linecap="round"
    fill="none"
    stroke={color}
    vector-effect="non-scaling-stroke"
  />
  <path
    d="M 60 60 L 50 30 L 55 0 M 60 60 L 80 35 L 90 0"
    stroke-width="1"
    stroke-linecap="round"
    fill="none"
    stroke="#000"
    vector-effect="non-scaling-stroke"
  />
  <path
    d="M 60 60 L 50 30 L 80 35 L 60 60"
    stroke-width="1"
    stroke-linecap="round"
    fill={color}
    stroke="#000"
    vector-effect="non-scaling-stroke"
  />
</svg>
