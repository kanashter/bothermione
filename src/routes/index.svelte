<script context="module">
	import { firebaseConfig } from '$lib/_database/firebaseConfig';
	import firebase from 'firebase/compat/app';
	import 'firebase/compat/database';
	export function load() {
		firebase.initializeApp(firebaseConfig);
		async function collectDetails() {
			let db = firebase
				.database()
				.ref('largefics')
				.orderByKey()
				.limitToLast(5)
				.get()
				.then((snapshot) => {
					return snapshot.val();
				});
			return db;
		}
		async function collectFics() {
			let db = firebase
				.database()
				.ref('fics')
				.get()
				.then((snapshot) => {
					return snapshot.val();
				});
			return db;
		}

		return {
			props: {
				data: collectDetails(),
				fics: collectFics()
			}
		};
	}
</script>

<script>
	import { FicContainer, TweetContainer } from '$lib/components';
	export let data;
	export let fics;
</script>

<div class="wrapper">
	<div class="container">
		<h1>BotHermione's Page</h1>
		<img class="logo" src="/images/logo.jpg" alt="BOTHERMIONE" />
	</div>

	<div class="row">
		<div class="column">
			<h1>Things I've Written</h1>
			{#await data}
				<p>LOADING</p>
			{:then items}
				{#each Object.keys(items).reverse() as item}
					<FicContainer text={items[item].text} date={item} length={100} />
				{/each}
			{/await}
		</div>
		<div class="column right">
			<h1>Things I Like</h1>
			{#await fics}
				<p>LOADING</p>
			{:then ficItems}
				{#each Object.keys(ficItems) as fic}
					<TweetContainer tweet={ficItems[fic]} />
				{/each}
			{/await}
		</div>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
	.container {
		width: 60%;
		display: flex;
		justify-content: center;
	}
	.row {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.column {
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	h1 {
		font-family: var(--serif-font);
		font-style: italic;
		z-index: 1;
		mix-blend-mode: difference;
		color: rgb(45, 42, 42);
	}
	p {
		font-family: var(--serif-font);
		font-style: italic;
		color: rgb(45, 42, 42);
	}
	.logo {
		width: 100px;
		height: 100px;
		border-radius: 100px;
		position: absolute;
		z-index: 0;
	}
	@media only screen and (max-width: 600px) {
		.container {
			width: 80%;
		}
		.row {
			flex-direction: column;
		}
		.column {
			width: 100%;
		}
	}
</style>
