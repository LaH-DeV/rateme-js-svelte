<script lang="ts">
    import svelteLogo from "../../assets/svelte.svg";
	import typescriptLogo from "../../assets/typescript.svg";
	import ratemeLogo from "../../assets/rateme.svg";
    import ParticledText from "./particleText/ParticledText.svelte";
    import SingleLogo from "./SingleLogo.svelte";
    import { afterUpdate } from "svelte";
    import { appConfig } from "../../app.config";
    const vitePath = '../vite.svg';
    const baseText = appConfig.highlightBase;
    export let text: string = baseText;
    let timeout: NodeJS.Timeout;
    afterUpdate(() => {
        if(text !== baseText) {
            if(timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                text = baseText;
            }, appConfig.highlightTime * 1000);
        }
    });
</script>

<div class="mt-5">
    <ParticledText {text} color="goldenrod" />
    <div class="d-flex justify-content-center align-items-center gap-12 mt-5">
        <SingleLogo name="Vite" path={vitePath} link="https://vitejs.dev" />
        <SingleLogo name="Svelte" path={svelteLogo} link="https://svelte.dev" />
        <SingleLogo name="TypeScript" path={typescriptLogo} link="https://www.typescriptlang.org/" />
        <SingleLogo name="RateMe-js" path={ratemeLogo} link="https://www.npmjs.com/package/rateme-js" />
    </div>
</div>

