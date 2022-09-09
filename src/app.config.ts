import type { DispatchOptions } from "svelte/internal";
import type { RateMeConfig } from "rateme-js/lib/es6/lib/typings";

export interface AppConfig {
	ratingRequired: boolean;
	renderRandom: boolean;
	lastReviewsLimit: number;
	initialRating: number;
	preditionUrl: string;
	reviewUrl: string;
	sentimentThreshold: number;
	loaderDelay: number;
	highlightBase: string;
	highlightTime: number;
}

export interface Review {
	reviewAuthor: string;
	reviewContent: string;
	reviewRating: number;
	id: string;
	date: number;
	sentiment?: {
		positive: number;
		negative: number;
	}
}

export interface FormField {
	required?: boolean;
	minLength?: number;
	[prop: string]: number | string | boolean;
}

export interface FormConfig {
	[field: string]: FormField;
}

export interface ReviewElement extends Pick<Review, "reviewAuthor" | "reviewContent" | "reviewRating"> {}
export type AddReviewEvent = <EventKey extends string>(type: EventKey, detail: ReviewElement, options?: DispatchOptions) => boolean;
export interface RandomResponseReview {
	review: {
		text: string;
		rating: string;
		author: string;
		date: number;
		id: string;
	}
}

export const appConfig: AppConfig = {
	ratingRequired: false,
	renderRandom: true,
	lastReviewsLimit: 3,
	initialRating: 2.5,
	sentimentThreshold: 0.6,
	preditionUrl: "http://localhost:7500/predict",
	reviewUrl: "http://localhost:7500/review",
	loaderDelay: 0,
	highlightBase: "RateMe-js",
	highlightTime: 3,
};

export const formConfig: FormConfig = {
	nameField: {
		minLength: 5,
		required: true,
	},
	reviewField: {
		minLength: 15,
		required: true,
	}
}

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