<script>
	import { tweened } from 'svelte/motion';
	import { expoInOut } from 'svelte/easing';
	export let date;
	export let text;
	export let length;

	let position = tweened(1, {
		duration: 400,
		easing: expoInOut
	});

	const substring = text.substring(0, length) + '...';

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
		href="/fics/{date}"
		sveltekit:prefetch
		on:mouseenter={() => hover('in')}
		on:mouseout={() => hover('out')}
		on:blur={void 0}
	>
		<h1>{date}</h1>
		<p>{substring}</p>
	</a>
</div>

<style>
	h1 {
		font-family: var(--serif-font);
		font-style: italic;
		pointer-events: none;
	}
	p {
		font-family: var(--sans-font);
		pointer-events: none;
	}
	.container {
		width: 80%;
		border: 2px solid rgb(54, 54, 54);
		padding: 10px;
		border-radius: 10px;
		text-align: center;
		display: flex;
		flex-direction: column;
		margin-bottom: 2rem;
	}
</style>
