<script lang="ts">
	import type { RateMe } from "rateme-js";
	import type { Review } from "../../../app.config";
	import { fade } from "svelte/transition";

	export let rater: RateMe;
	export let review: Review;

	const { reviewAuthor, reviewContent, date, reviewRating } = review;
</script>

<div class="rating-box" in:fade={{ duration: 500 }}>
	<div class="upper-box">
		{@html rater.ratingHTML(reviewRating)}
		<span>{reviewAuthor}, {date}</span>
	</div>
	<div class="content">{reviewContent}</div>
</div>

