import type { DispatchOptions } from "svelte/internal";
import type { RateMeConfig } from "rateme-js/lib/es6/lib/typings";

export interface AppConfig {
	ratingRequired: boolean;
	renderRandom: boolean;
	lastReviewsLimit: number;
	initialRating: number;
}

export interface Review {
	reviewAuthor: string;
	reviewContent: string;
	reviewRating: number;
	id: string;
	date: string;
}

export interface ReviewElement extends Pick<Review, "reviewAuthor" | "reviewContent" | "reviewRating"> {}
export type AddReviewEvent = <EventKey extends string>(type: EventKey, detail: ReviewElement, options?: DispatchOptions) => boolean;

export const appConfig: AppConfig = {
	ratingRequired: false,
	renderRandom: true,
	lastReviewsLimit: 5,
	initialRating: 2.5,
};

export const ratemeConfig: RateMeConfig = {
	maxValue: 5,
	iconSpacing: 6,
	iconSize: 20,
	allowAnimations: true,
	withCancel: false,
	gradientFirst: "#fece3c",
	gradientSecond: "#f5f5f5",
	strokeColor: "transparent",
	strokeStyle: "stroke-opacity: 0.3;",
	disableStyles: false,
};