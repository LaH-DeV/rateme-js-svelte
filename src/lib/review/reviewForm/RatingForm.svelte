<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { AddReviewEvent } from "../../../app.config";
	import { validate } from "../../helpers";
	import RaterField from "./RaterField.svelte";
	import InputField from "../../textInputField/TextInputField.svelte";
	const dispatchAddReview: AddReviewEvent = createEventDispatcher();

	let author: string;
	let content: string;
	let rating: number = 0;

	$:validForm = validate(author) && validate(content) && validate(rating);
	
	function handleForm() {
		dispatchAddReview("addrating", { reviewAuthor: author, reviewContent: content, reviewRating: rating });
		author = "";
		content = "";
		rating = 0;
	}
</script>

<form id="ratingForm" on:submit|preventDefault={handleForm}>
	<InputField bind:value={author} name="name" label="Name *" required={true} />
	<RaterField bind:value={rating} name="rating"/>
	<InputField bind:value={content} name="review" label="Review *" required={true} isTextarea={true} />
	<button type="submit" disabled={!validForm} class="btn btn-primary w-100">Submit</button>
</form>
