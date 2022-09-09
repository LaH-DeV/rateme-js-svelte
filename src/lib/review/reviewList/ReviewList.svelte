<script lang="ts">
    import { onMount, createEventDispatcher } from "svelte";
	import { flip } from "svelte/animate";
	import { fade } from "svelte/transition";
	import { ratemeConfig, type Review as ReviewType } from "../../../app.config";
	import { RateMe } from "rateme-js";
	import Review from "./Review.svelte";
	import Loader from "../../loader/Loader.svelte";

	export let reviews: ReviewType[] = [];
	export let listLimit: number;
	export let isLoading: boolean;

	let rater: RateMe;
    const dispatchEvent = createEventDispatcher();

	onMount(() => {
		rater = new RateMe({ ...ratemeConfig, allowAnimations: false });
	});

    function deleteReview(e: MouseEvent) {
        const reviewWrapper = e.target as HTMLDivElement;
        dispatchEvent("removerating", reviewWrapper.id);
    }
    function loadRandom() {
        dispatchEvent("loadrandom");
    }
</script>

<h2 class="position-relative">
	Recent reviews
	{#if reviews?.length > 0}
		<span in:fade class="pl-3 font-size-50 position-absolute">{`(${reviews.length} / ${listLimit})`}</span>
	{/if}
</h2>
{#if isLoading}
	<Loader />
{:else}
	<div class="list-wrapper m-3 d-flex flex-column gap-4">
		{#if reviews.length > 0}
			{#each reviews as review, i (review.id)}
				<div class="review-wrapper" id={review.id} on:click={deleteReview} animate:flip>
					<Review {rater} {review} />
				</div>
			{/each}
		{:else}
			<span in:fade class="mt-7">No reviews found. Maybe add some? <a href="random" on:click|preventDefault={loadRandom}>(or get random)</a></span>
		{/if}
	</div>
{/if}