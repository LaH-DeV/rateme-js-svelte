import { appConfig, type FormField } from "../app.config";

export function randomString(dictionary?: string): string {
	const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const charset = dictionary ?? ALPHABET;
	return charset
		.split("")
		.sort(() => 0.5 - Math.random())
		.join("")
		.substring(Math.floor(Math.random() * charset.length));
}

export const sleep = (seconds: number): Promise<boolean> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, seconds * 1000);
	});
};

export const validate = (data: string | number | boolean, config?: FormField) => {
	if (typeof data === "string") return data.length >= config.minLength;
	if (typeof data === "number") return appConfig.ratingRequired ? data !== 0 : true;
};
