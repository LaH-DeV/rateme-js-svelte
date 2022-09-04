import { appConfig, type Review, type ReviewElement } from "../app.config";

const LOREM_TEMPLATE = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt velit quibusdam a adipisci culpa minima eligendi! Delectus sapiente placeat odit modi adipisci eos commodi accusamus dignissimos repellat quaerat? Deserunt, quaerat!";
const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NAMES = ["Albert", "Allen", "Bert", "Bob", "Cecil", "Clarence", "Elliot", "Elmer", "Ernie", "Eugene", "Fergus", "Ferris", "Frank", "Frasier", "Fred", "George", "Graham", "Harvey", "Irwin", "Larry", "Lester", "Marvin", "Neil", "Niles", "Oliver", "Opie", "Ryan", "Toby", "Ulric", "Ulysses", "Uri", "Waldo", "Wally", "Walt", "Wesley", "Yanni", "Yogi", "Yuri"];
export function randomDate(start: Date = new Date(2021, 0, 1), end: Date = new Date()) {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}
export function randomString(dictionary?: string): string {
	const charset = dictionary ?? ALPHABET;
	return charset
		.split("")
		.sort(() => 0.5 - Math.random())
		.join("")
		.substring(Math.floor(Math.random() * charset.length));
}
export function randomNumber(max: number): number {
	return Math.round(Math.random() * max * 2) / 2;
}
export function randomReviews(count: number = 1): Review[] {
	const reviews: Review[] = [];
	for (let i = 0; i < count; i++) {
		const review = {
			reviewAuthor: NAMES[Math.floor(randomNumber(NAMES.length - 1))],
			reviewContent: randomString(LOREM_TEMPLATE),
			date: randomDate(new Date(2021, 0, 1), new Date()),
			reviewRating: randomNumber(5.5),
			id: randomString(),
		};
		reviews.push(review);
	}
	return reviews;
}

export const sleep = (seconds: number): Promise<boolean> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, seconds * 1000);
	});
};

export const validate = (data: string | number) => {
	if (typeof data === "string") return data != "";
	if (typeof data === "number") return appConfig.ratingRequired ? data !== 0 : true;
};

export const generateReview = (e: CustomEvent<ReviewElement>): Review => {
	const { reviewAuthor, reviewContent, reviewRating } = e.detail;
	const newReview: Review = {
		reviewAuthor,
		reviewContent,
		reviewRating,
		id: randomString(),
		date: randomDate()
	}
	return newReview;
}

export const initialReviews = (renderRandom: boolean, limit: number): Review[] => {
	return renderRandom ? [...randomReviews(randomNumber(limit))] : [];
}