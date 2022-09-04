<script lang="ts">
	import { onMount } from "svelte";
	import { ratemeConfig, appConfig } from "../../../app.config";
	import { RateMe } from "rateme-js";

	export let value: number = 0;
	export let name: string = '';
	
	const required = appConfig.ratingRequired;
	
	let input: HTMLInputElement;
	let container: HTMLDivElement;
	let rater: RateMe;
	let ratingId: string;

	onMount(() => {
		rater = new RateMe({ ...ratemeConfig, withCancel: !required });
		ratingId = rater.rate(input, container, null, appConfig.initialRating);
		input.addEventListener("rated", (e: CustomEvent<number>) => {
			value = e.detail;
		});
	});

	$: if (value === 0 && rater != null) rater.clear(ratingId, required);
</script>

<div class="center" bind:this={container} />
<input bind:this={input} type="hidden" {name} {required} />
