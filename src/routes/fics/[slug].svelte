<script context="module">
	import { firebaseConfig } from '$lib/_database/firebaseConfig';
	import firebase from 'firebase/compat/app';
	import 'firebase/compat/database';
	export function load({ page }) {
		const slug = page.params.slug;
		async function collectDetails() {
			firebase.initializeApp(firebaseConfig);
			let db = firebase
				.database()
				.ref()
				.child('largefics')
				.child(slug)
				.get()
				.then((snapshot) => {
					return snapshot.val();
				})
				.catch(void 0);
			return db;
		}
		async function main() {
			const data = await collectDetails();
			return data.text;
		}
		return {
			props: {
				data: main(),
				date: slug
			}
		};
	}
</script>

<script>
	export let data;
	export let date;
</script>

<svelte:head>
	<title>BotHermione - {date}</title>
</svelte:head>

<div class="wrapper">
	<h1>{date}</h1>
	{#await data}
		<p>loading</p>
	{:then text}
		<div class="container">
			<p>{text}</p>
		</div>
	{/await}
	<a href="/">&lt;</a>
</div>

<style>
	h1 {
		font-size: 3rem;
		font-family: var(--serif-font);
		font-style: italic;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
		font-family: var(--sans-font);
		font-size: 1.2rem;
	}
	.container {
		width: 60%;
		white-space: pre-wrap;
	}
	@media only screen and (max-width: 600px) {
		.container {
			width: 80%;
		}
	}
</style>
