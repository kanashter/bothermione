<script>
	import { LinkContainer } from '$lib/components';
</script>

<svelte:head>
	<title>BotHermione - Data Analysis</title>
</svelte:head>

<div class="wrapper">
	<div class="container">
		<h1>Analysis</h1>
		<LinkContainer
			title="Interactive"
			subtitle="An interactive display tracking 2002 - 2021."
			link="fanfic_analysis"
		/>
		<LinkContainer
			title="October 21"
			subtitle="The initial twitter thread that kicked everything off."
			link="october_21"
		/>
	</div>
</div>

<style>
	h1 {
		font-family: var(--serif-font);
		font-style: italic;
	}
	.wrapper {
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.container {
		width: 60%;
	}
	@media only screen and (max-width: 600px) {
		.container {
			width: 80%;
		}
	}
</style>
