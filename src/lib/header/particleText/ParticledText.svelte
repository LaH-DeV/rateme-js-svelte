<script lang="ts">
    import { onMount } from "svelte";
    import particledText from "./ParticledText";
    export let text: string;
    export let color: string = 'gold';
    export let width: number = 900;
    export let height: number = 120;
    let canvas: HTMLCanvasElement;
    onMount(() => {
        particledText(text, canvas, {color});
    });
</script>

<canvas bind:this={canvas} width={width} height={height}></canvas>