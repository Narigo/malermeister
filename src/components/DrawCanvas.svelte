<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import DrawingTools from "./DrawingTools.svelte";

  export let prompt: string;
  export let initialLineWidth: number = 2;

  let currentLineWidth = initialLineWidth;

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
    ctx.lineWidth = currentLineWidth;
    ctx.lineCap = "round";
  });

  onDestroy(() => {
    canvasRef.removeEventListener("pointerdown", onPointerDown);
    canvasRef.removeEventListener("pointermove", onPointerMove);
    canvasRef.removeEventListener("pointerup", onPointerUp);
    canvasRef.removeEventListener("pointerenter", onPointerEnter);
  });

  function getCoords(event: PointerEvent): [number, number] {
    const { left, top } = canvasRef.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    return [x, y];
  }

  function onPointerEnter(event: PointerEvent) {
    isDrawing = event.pressure !== 0;
    origin = getCoords(event);
  }

  function onPointerDown(event: PointerEvent) {
    isDrawing = true;
    origin = getCoords(event);
  }

  function onPointerMove(event: PointerEvent) {
    if (isDrawing) {
      const [x, y] = getCoords(event);
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

  function changeOptions(
    event: CustomEvent<{ lineWidth: number; strokeStyle: string }>
  ) {
    const { lineWidth, strokeStyle } = event.detail;
    ctx.strokeStyle = strokeStyle || ctx.strokeStyle;
    ctx.lineWidth = lineWidth || ctx.lineWidth;
    currentLineWidth = ctx.lineWidth;
  }
</script>

<h2>Please draw '{prompt}'</h2>
<canvas bind:this={canvasRef} />
<DrawingTools bind:lineWidth={currentLineWidth} on:change={changeOptions} />

<style>
  canvas {
    box-shadow: 0 0 20px #666;
    display: block;
    height: 50%;
    margin: 25px auto;
    min-height: 75vh;
    width: 50%;
  }
</style>
