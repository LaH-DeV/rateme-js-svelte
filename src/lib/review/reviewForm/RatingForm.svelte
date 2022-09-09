<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { formConfig, appConfig, type AddReviewEvent } from "../../../app.config";
	import { validate } from "../../helpers";
	import RaterField from "./RaterField.svelte";
	import InputField from "../../textInputField/TextInputField.svelte";
	const dispatchAddReview: AddReviewEvent = createEventDispatcher();
	const { nameField, reviewField } = formConfig;
	const { initialRating } = appConfig;
	
	let author: string;
	let content: string;
	let rating: number = initialRating;
	let raterField: RaterField;

	$:validForm = (validate(author, nameField) && validate(content, reviewField) && validate(rating));
	
	const clearForm = () => {
		author = "";
		content = "";
		raterField.update(initialRating);
	}
	const handleForm = () => {
		dispatchAddReview("addrating", { reviewAuthor: author, reviewContent: content, reviewRating: rating });
		clearForm();
	}
</script>

<h2>Leave a review</h2>
<form id="ratingForm" on:submit|preventDefault={handleForm}>
	<InputField bind:value={author} name="name" label="Name *" validation={nameField} />
	<RaterField bind:value={rating} name="rating" bind:this={raterField} />
	<InputField bind:value={content} name="review" label="Review *" validation={reviewField} isTextarea={true} />
	<button type="submit" disabled={!validForm} class="btn btn-primary w-100">Submit</button>
</form>
