<script>
	import { tweened } from 'svelte/motion';
	import { expoInOut } from 'svelte/easing';
	export let subtitle;
	export let title;
	export let link;

	let position = tweened(1, {
		duration: 400,
		easing: expoInOut
	});

	function hover(direction) {
		if (direction == 'in') {
			position.set(1.1);
		} else {
			position.set(1);
		}
	}
</script>

<div class="container" style="transform: scale({$position})">
	<a
		href="/analysis/{link}"
		sveltekit:prefetch
		on:mouseenter={() => hover('in')}
		on:mouseout={() => hover('out')}
		on:blur={void 0}
	>
		<h1>{title}</h1>
		<p>{subtitle}</p>
	</a>
</div>

<style>
	h1 {
		font-family: var(--serif-font);
		font-style: italic;
		pointer-events: none;
		color: rgb(45, 42, 42);
	}
	p {
		font-family: var(--sans-font);
		pointer-events: none;
		color: rgb(45, 42, 42);
	}
	.container {
		border: 2px solid rgb(54, 54, 54);
		padding: 10px;
		border-radius: 10px;
		text-align: center;
		display: flex;
		flex-direction: column;
		margin-bottom: 2rem;
	}
</style>
