<script lang="ts">
  export let prompt;

  let canvasRef: HTMLCanvasElement;
</script>

<p>There will be a canvas to draw '{prompt}'</p>
<canvas bind:this={canvasRef} />

<style>
  p {
    color: green;
  }

  canvas {
    box-shadow: 0 0 20px #666;
    display: block;
    height: 50%;
    margin: 25px auto;
    width: 50%;
  }
</style>
