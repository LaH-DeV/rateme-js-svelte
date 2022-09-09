<script lang="ts">
	import { fade } from "svelte/transition";
	import type { RateMe } from "rateme-js";
	import { appConfig, type Review } from "../../../app.config";

	export let rater: RateMe;
	export let review: Review;
	const { sentimentThreshold } = appConfig;
	const { reviewAuthor, reviewContent, date, reviewRating, sentiment } = review;

</script>

<div class="rating-box" in:fade={{ duration: 500 }}>
	<div class="upper-box">
		{#if rater != null}
			{@html rater.ratingHTML(reviewRating)}
		{/if}
		<span>
			{#if sentiment?.positive > sentimentThreshold}<span class="checkmark"></span>
			{:else if sentiment?.negative > sentimentThreshold}<span>&#10060;</span>{/if}
			{reviewAuthor}, {new Date(date).toLocaleDateString()}
		</span>
	</div>
	<div class="content">{reviewContent}</div>
</div>

