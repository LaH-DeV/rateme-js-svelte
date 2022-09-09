export const getSentiment = async (preditionUrl: string, text: string) => {
	try {
		const response = await fetch(`${preditionUrl}?lang=en&reload_model=false&text=${text}`);
		const sentiment = await response.json();
		return sentiment.prediction;
	} catch (error) {
		console.log(error);
	}
}

export const getRandomReview = async (reviewUrl: string, rating?: number) => {
	try {
		const response = await fetch(`${reviewUrl}?lang=en${rating != null ? `&rating=${rating}` : ''}`);
		const review = await response.json();
		return review;
	} catch (error) {
		console.log(error);
	}
}
