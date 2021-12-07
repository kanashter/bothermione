<script context="module">
	import { firebaseConfig } from '$lib/_database/firebaseConfig';
	import firebase from 'firebase/compat/app';
	import 'firebase/compat/database';
	export function load({ page }) {
		async function collectDetails() {
			firebase.initializeApp(firebaseConfig);
			let db = firebase
				.database()
				.ref('largefics')
				.orderByKey()
				.get()
				.then((snapshot) => {
					return snapshot.val();
				});
			return db;
		}
		return {
			props: {
				data: collectDetails()
			}
		};
	}
</script>

<script>
	import { FicContainer } from '$lib/components';
	export let data;
</script>

<svelte:head>
	<title>BotHermione - Archive</title>
</svelte:head>

<div class="wrapper">
	<div class="container">
		<h1>ARCHIVE</h1>
		{#await data}
			<p>LOADING</p>
		{:then items}
			{#each Object.keys(items).reverse() as item}
				<FicContainer text={items[item].text} date={item} length={200} />
			{/each}
		{/await}
	</div>
</div>

<style>
	.wrapper {
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.container {
		width: 80%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	h1 {
		font-family: var(--serif-font);
		font-style: italic;
	}
	p {
		font-family: var(--serif-font);
		font-style: italic;
	}
</style>
