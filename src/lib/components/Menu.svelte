<script>
	import { tweened, spring } from 'svelte/motion';
	import { expoInOut } from 'svelte/easing';

	let expanded = false;

	let position = tweened(0, {
		duration: 400,
		easing: expoInOut
	});

	let rotate = spring(0, {
		stiffness: 0.02,
		damping: 0.01,
		precision: 0.9
	});

	function toggleMenu(e) {
		if (expanded == false) {
			expanded = !e;
			position.set(40);
			rotate.set(360);
		} else {
			position.set(0);
			window.setTimeout(function () {
				expanded = !e;
			}, 400);
			rotate.set(0);
		}
	}
</script>

{#if expanded == false}
	<div class="hamburger" on:click={() => toggleMenu(expanded)}>
		<img src="/images/menu.svg" alt="Open Menu" />
	</div>
{:else}
	<div class="menu" style="width:{$position}%">
		<div class="hamburger" on:click={() => toggleMenu(expanded)}>
			<img src="/images/close.svg" alt="Open Menu" />
		</div>
		<div class="links">
			<a href="/" on:click={() => toggleMenu(expanded)}>HOME</a>
			<a href="/fics" on:click={() => toggleMenu(expanded)}>ARCHIVE</a>
			<a href="/about" on:click={() => toggleMenu(expanded)}>ABOUT</a>
			<a href="/analysis" on:click={() => toggleMenu(expanded)}>ANALYSIS</a>
			<a href="/wrapped" on:click={() => toggleMenu(expanded)}>WRAPPED</a>
			<a href="https://twitter.com/BotHermione" target="_blank">TWITTER</a>
			<a href="https://archiveofourown.org/users/BotHermione" target="_blank">AO3</a>
		</div>
		<div class="imageContainer" style="transform: rotate({$rotate}deg);">
			<img class="logo" src="/images/logo.jpg" alt="BOTHERMIONE" />
		</div>
	</div>
{/if}

<style>
	.hamburger {
		position: fixed;
		top: 10px;
		right: 10px;
		z-index: 3;
		cursor: pointer;
		width: 50px;
		height: 50px;
		filter: invert(90%) sepia(5%) saturate(775%) hue-rotate(314deg) brightness(91%) contrast(81%);
	}
	.menu {
		position: fixed;
		top: 0;
		right: 0;
		width: 20%;
		height: 100vh;
		background-color: rgb(144, 123, 123);
		z-index: 2;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--serif-font);
		color: rgb(74, 54, 54);
	}
	.links {
		height: 50%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	img {
		object-fit: contain;
		height: 25px;
		width: 25px;
	}
	.imageContainer {
		position: fixed;
		bottom: 10%;
	}
	.logo {
		width: 100px;
		height: 100px;
		border-radius: 100px;
	}
</style>
