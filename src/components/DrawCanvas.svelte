<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  export let prompt: string;

  let canvasRef: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let isDrawing = false;
  let origin: [number, number] = [0, 0];

  onMount(() => {
    canvasRef.addEventListener("pointerdown", onPointerDown);
    canvasRef.addEventListener("pointermove", onPointerMove);
    canvasRef.addEventListener("pointerup", onPointerUp);
    canvasRef.addEventListener("pointerenter", onPointerEnter);
    canvasRef.width = canvasRef.scrollWidth;
    canvasRef.height = canvasRef.scrollHeight;
    ctx = canvasRef.getContext("2d");
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
  });

  onDestroy(() => {
    canvasRef.removeEventListener("pointerdown", onPointerDown);
    canvasRef.removeEventListener("pointermove", onPointerMove);
    canvasRef.removeEventListener("pointerup", onPointerUp);
    canvasRef.removeEventListener("pointerenter", onPointerEnter);
  });

  function onPointerEnter(event: PointerEvent) {
    isDrawing = event.pressure !== 0;
    const x =
      ((event.clientX - canvasRef.offsetLeft) / canvasRef.clientWidth) *
      canvasRef.width;
    const y =
      ((event.clientY - canvasRef.offsetTop) / canvasRef.clientHeight) *
      canvasRef.height;
    origin = [x, y];
  }

  function onPointerDown(event: PointerEvent) {
    isDrawing = true;
    const x =
      ((event.clientX - canvasRef.offsetLeft) / canvasRef.clientWidth) *
      canvasRef.width;
    const y =
      ((event.clientY - canvasRef.offsetTop) / canvasRef.clientHeight) *
      canvasRef.height;
    origin = [x, y];
  }

  function onPointerMove(event: PointerEvent) {
    if (isDrawing) {
      const x =
        ((event.clientX - canvasRef.offsetLeft) / canvasRef.clientWidth) *
        canvasRef.width;
      const y =
        ((event.clientY - canvasRef.offsetTop) / canvasRef.clientHeight) *
        canvasRef.height;
      ctx.beginPath();
      ctx.moveTo(origin[0], origin[1]);
      ctx.lineTo(x, y);
      ctx.stroke();
      origin = [x, y];
    }
  }

  function onPointerUp(event: PointerEvent) {
    isDrawing = false;
  }
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
    min-height: 75vh;
    width: 50%;
  }
</style>
