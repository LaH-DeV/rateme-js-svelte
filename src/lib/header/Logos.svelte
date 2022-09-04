<script lang="ts">
	import svelteLogo from "../../assets/svelte.svg";
	import typescriptLogo from "../../assets/typescript.svg";
	import ratemeLogo from "../../assets/rateme.svg";
    import ParticledText from "./particleText/ParticledText.svelte";
    import SingleLogo from "./SingleLogo.svelte";
    const vitePath = '../vite.svg';
</script>

<div class="mt-5">
    <ParticledText text="RateMe-js" color="goldenrod" />
    <div class="d-flex justify-content-center align-items-center gap-12 mt-5">
        <SingleLogo name="Vite" path={vitePath} link="https://vitejs.dev" />
        <SingleLogo name="Svelte" path={svelteLogo} link="https://svelte.dev" />
        <SingleLogo name="TypeScript" path={typescriptLogo} link="https://www.typescriptlang.org/" />
        <SingleLogo name="RateMe-js" path={ratemeLogo} link="https://www.ratemejs.com/" />
    </div>
</div>

