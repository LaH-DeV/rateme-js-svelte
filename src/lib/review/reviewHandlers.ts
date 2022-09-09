import { appConfig, type Review, type ReviewElement, type RandomResponseReview } from "../../app.config";
import { getSentiment, getRandomReview } from "../../apiHandler";
import { randomString, sleep } from "../helpers";

export const randomReview = async (): Promise<Review> => {
	const random: RandomResponseReview = await getRandomReview(appConfig.reviewUrl);
	return {
		reviewAuthor: random.review.author,
		reviewContent: random.review.text,
		reviewRating: Number(random.review.rating),
		date: random.review.date * 1000,
		id: random.review.id.replace(/[0-9]/g, ''),
	};
};

export const randomReviews = async (count: number = 1, sleepTime: number = 3): Promise<Review[]> => {
    if(sleepTime > 0) {
        await sleep(sleepTime);
    }
	const reviews: Review[] = [];
	for (let i = 0; i < count; i++) {
		reviews.push(await randomReview());
	}
	return reviews;
};

export const getSentimentForReview = async (review: Review): Promise<Review> => {
	const sentiment = await getSentiment(appConfig.preditionUrl, review.reviewContent);
	review.sentiment = {
		negative: sentiment[0].score,
		positive: sentiment[1].score,
	};
	return review;
};

export const generateReview = async (e: CustomEvent<ReviewElement>): Promise<Review> => {
	const { reviewAuthor, reviewContent, reviewRating } = e.detail;
	const newReview: Review = {
		reviewAuthor,
		reviewContent,
		reviewRating,
		id: randomString(),
		date: Date.now(),
	};
	return await getSentimentForReview(newReview);
};
