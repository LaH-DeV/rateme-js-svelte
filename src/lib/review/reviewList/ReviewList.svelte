<script lang="ts">
    import { createEventDispatcher } from "svelte";
	import { flip } from "svelte/animate";
	import { ratemeConfig, type Review as ReviewType } from "../../../app.config";
	import { RateMe } from "rateme-js";
	import Review from "./Review.svelte";

	export let reviews: ReviewType[] = [];
    const dispatchEvent = createEventDispatcher();
	const rater = new RateMe({ ...ratemeConfig, allowAnimations: false });

    function deleteReview(e: MouseEvent) {
        const reviewWrapper = e.target as HTMLDivElement;
        dispatchEvent("removerating", reviewWrapper.id);
    }
    function loadRandom() {
        dispatchEvent("loadrandom");
    }
</script>

<div class="list-wrapper m-3 d-flex flex-column gap-4">
	{#if reviews.length > 0}
		{#each reviews as review, i (review.id)}
			<div class="review-wrapper" id={review.id} on:click={deleteReview} animate:flip>
				<Review {rater} {review} />
			</div>
		{/each}
	{:else}
		<span class="mt-7">No reviews found. Maybe add some? <a href="random" on:click|preventDefault={loadRandom}>(or get random)</a></span>
	{/if}
</div>
