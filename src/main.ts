import "./lib/styles/general.css";
import "./lib/styles/utils.scss";

import { appConfig as config } from "./app.config";
import ReviewApp from "./ReviewApp.svelte";

const app = new ReviewApp({
	target: document.getElementById("app"),
	props: {
		config,
	},
});

export default app;
