<script lang="ts">
	import "./lib/review/reviews.scss";
	import type { Review, AppConfig, ReviewElement } from "./app.config";
	import Logos from "./lib/header/Logos.svelte";
	import ReviewList from "./lib/review/reviewList/ReviewList.svelte";
	import RatingForm from "./lib/review/reviewForm/RatingForm.svelte";
	import { initialReviews, generateReview } from "./lib/helpers";

	export let config: AppConfig;
	const listLimit = config.lastReviewsLimit;

	let reviews: Review[] = initialReviews(config.renderRandom, listLimit);

	function addReview(event: CustomEvent<ReviewElement>) {
		reviews = [generateReview(event), ...reviews.splice(0, listLimit - 1)];
	}
    function removeReview(event: CustomEvent<string>) {
		reviews = [...reviews.filter(review => review.id !== event.detail)];
	}
    function loadRandom(_: CustomEvent) {
        reviews = [...initialReviews(config.renderRandom, listLimit).splice(0, listLimit)];
    }
</script>

<main class="container">
	<Logos />
	<div class="row mt-10 justify-content-center">
		<div class="col-5">
			<h2>Leave a review</h2>
			<RatingForm on:addrating={addReview} />
		</div>
		<div class="col-6">
			<h2 class="position-relative">
				Last reviews
				{#if reviews.length > 0}
					<span class="pl-3 font-size-50 position-absolute">{`(${reviews.length} / ${listLimit})`}</span>
				{/if}
			</h2>
			<ReviewList on:removerating={removeReview} on:loadrandom={loadRandom} {reviews} />
		</div>
	</div>
</main>
