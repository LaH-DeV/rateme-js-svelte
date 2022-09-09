import "./lib/styles/general.css";
import "./lib/styles/utils.scss";

import ReviewApp from "./ReviewApp.svelte";

const app = new ReviewApp({
	target: document.getElementById("app")
});

export default app;
