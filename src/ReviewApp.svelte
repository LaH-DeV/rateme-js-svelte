<script lang="ts">
	import Logos from "./lib/header/Logos.svelte";
	import Reviews from "./lib/review/Reviews.svelte";
	let text: string;
</script>
<main class="container">
	<Logos bind:text={text} />
	<Reviews on:highlight={(e) => {}} />
	<!-- <Reviews on:highlight={(e) => {text = e.detail;}} /> -->
</main>
