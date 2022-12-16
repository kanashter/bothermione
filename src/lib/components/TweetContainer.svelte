<script>
	import { tweened } from 'svelte/motion';
	import { expoInOut } from 'svelte/easing';

	export let tweet;

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
		href={tweet.link}
		sveltekit:prefetch
		on:mouseenter={() => hover('in')}
		on:mouseout={() => hover('out')}
		on:blur={void 0}
		target="_blank"
	>
		<h1>{tweet.string}</h1>
	</a>
</div>

<style>
	h1 {
		font-family: var(--serif-font);
		font-style: italic;
		pointer-events: none;
	}
	.container {
		width: 80%;
		border: 2px solid rgb(152, 84, 84);
		padding: 10px;
		border-radius: 10px;
		text-align: center;
		margin-bottom: 2rem;
	}
</style>
