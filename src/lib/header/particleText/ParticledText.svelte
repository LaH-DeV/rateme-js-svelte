<script lang="ts">
    import { afterUpdate } from "svelte";
    import particledText from "./particledText";
    export let text: string;
    export let color: string = 'gold';
    export let width: number = 900;
    export let height: number = 120;
    let canvas: HTMLCanvasElement;
    afterUpdate(() => {
        if(canvas)
        particledText(text, canvas, {color});
    });
</script>

<canvas bind:this={canvas} width={width} height={height}></canvas>