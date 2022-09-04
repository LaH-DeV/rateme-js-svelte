<script lang="ts">
	export let link: string;
	export let name: string;
	export let path: string;
</script>

<a href={link} target="_blank" class="logo-link {name.toLowerCase()} d-flex flex-column justify-content-center">
	<img src={path} class="logo {name.toLowerCase()}" alt="{name} Logo" />
	<span class="brand-name">{name}</span>
</a>

<style lang="scss">
	a.logo-link {
        --var-color: #646cffaa;
		&.svelte {
			--var-color: #ff3e00aa;
		}
		&.typescript {
			--var-color: #3178c6;
		}
		&.rateme-js {
			--var-color: #fece3c;
		}
		.brand-name {
			font-size: 0.8rem;
			color: #333;
			transition: color 150ms ease;
		}
		.logo {
			height: 3rem;
			padding: 0.25rem;
			will-change: filter;
			filter: brightness(0.5);
		}
		&:hover {
			.logo {
				filter: drop-shadow(0 0 2em var(--var-color));
			}
			.brand-name {
				color: var(--var-color);
			}
		}
	}
</style>
