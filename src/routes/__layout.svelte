<script context="module">
	export const load = async ({ page }) => ({
		props: {
			key: page.path
		}
	});
</script>

<script>
	import { PageTransition, Menu } from '$lib/components';
	export let key;
</script>

<svelte:head>
	<title>BotHermione</title>
</svelte:head>

<Menu />

<PageTransition refresh={key}>
	<div class="spacer" />
	<slot />
	<div class="spacer" />
</PageTransition>

<style>
	.spacer {
		height: 20vh;
	}
</style>
