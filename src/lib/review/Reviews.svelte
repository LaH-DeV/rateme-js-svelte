<script lang="ts">
	import "./reviews.scss";
    import { onMount, createEventDispatcher } from "svelte";
    import ReviewList from "./reviewList/ReviewList.svelte";
	import RatingForm from "./reviewForm/RatingForm.svelte";
    import { appConfig, type Review, type ReviewElement } from "../../app.config";
    import { generateReview, randomReviews } from "./reviewHandlers";
    let reviews: Review[];
    let isLoading: boolean;

	const listLimit = appConfig.lastReviewsLimit;
	const loaderDelay = appConfig.loaderDelay;
    const dispatch = createEventDispatcher();
    const addReview = async (event: CustomEvent<ReviewElement>) => {
        const newRev = await generateReview(event);
        if(newRev.sentiment.positive > appConfig.sentimentThreshold) {
            dispatch("highlight", newRev.reviewAuthor);
        }
        reviews = [newRev, ...reviews.splice(0, listLimit - 1)];
	};
	const removeReview = (event: CustomEvent<string>) => {
		reviews = [...reviews.filter((review) => review.id !== event.detail)];
	};
	export const loadRandom = async (_?: CustomEvent, initial: boolean = false) => {
		isLoading = true;
        const randoms = await randomReviews(initial ? listLimit - 1 : listLimit, loaderDelay);
        reviews = [...randoms.splice(0, listLimit)].sort(((revA, revB) => { return revB.date - revA.date}));
        isLoading = false;
	};
    onMount(() => {
        if (appConfig.renderRandom) {
            loadRandom(undefined, true);
        }
    });
</script>

<div class="row mt-10 justify-content-center">
    <div class="col-5">
        <RatingForm on:addrating={addReview} />
    </div>
    <div class="col-6">
        <ReviewList on:removerating={removeReview} on:loadrandom={loadRandom} {reviews} {listLimit} {isLoading} />
    </div>
</div>