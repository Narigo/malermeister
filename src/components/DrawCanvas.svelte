<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  export let prompt;

  let canvasRef: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let isDrawing = false;
  let origin: [number, number] = [0, 0];

  onMount(() => {
    canvasRef.addEventListener("pointerdown", onPointerDown);
    canvasRef.addEventListener("pointermove", onPointerMove);
    canvasRef.addEventListener("pointerup", onPointerUp);
    ctx = canvasRef.getContext("2d");
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(50, 50);
    ctx.stroke();
  });

  onDestroy(() => {
    canvasRef.removeEventListener("pointerdown", onPointerDown);
    canvasRef.removeEventListener("pointermove", onPointerMove);
    canvasRef.removeEventListener("pointerup", onPointerUp);
  });

  function onPointerDown(event: PointerEvent) {
    isDrawing = true;
    origin = [event.clientX, event.clientY];
  }
  function onPointerMove(event: PointerEvent) {
    if (isDrawing) {
      ctx.beginPath();
      ctx.moveTo(origin[0], origin[1]);
      ctx.lineTo(event.clientX, event.clientY);
      ctx.stroke();
      origin = [event.clientX, event.clientY];
    }
  }
  function onPointerUp(event: PointerEvent) {
    console.log("pointerup");
    isDrawing = false;
  }
</script>

<p>There will be a canvas to draw '{prompt}'</p>
<canvas bind:this={canvasRef} width="200" height="200" />

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
