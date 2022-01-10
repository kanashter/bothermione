<script>
</script>

<svelte:head>
	<title>BotHermione - WRAPPED | Thank You</title>
</svelte:head>

<div class="wrapper">
	<div class="imgWrapper">
		<img src="/images/ao3_logo.png" alt="AO3 Logo" />
		<img class="altImage" src="/images/logo.jpg" alt="BotHermione logo" />
	</div>
	<div class="container">
		<h1>Thank You for Participating</h1>
		<p>
			It has truly been a joy to see everyone enjoying AO3 wrapped this year. The online servers
			will now be shut down till 2022 - when BotHermiones AO3 wrapped will return bigger, and better
			than ever.
			<br /><br />
			If you missed out on all the fun, don't despair. I'll keep the local version available for download.
			If you'd like to grab the release, it'll remain here for the year.
			<br /><br />
			<a
				href="https://github.com/kanashter/bothermione-ao3wrapped/releases/tag/v1.0.2"
				style="text-decoration: underline;">AO3 Wrapped - Local Version</a
			>
			<br /><br />
			There's been so much activity on the server, I decided to make a quick writeup. If you're interested
			in things like this, it can be found here
			<br /><br />
			<a href="/wrapped/retrospective_2021" style="text-decoration: underline;"
				>2021 - AO3 Wrapped Retrospective</a
			>
			<br /><br />
			It's been truly wonderful sharing this little slice of joy with you all. I'll admit I didn't expect
			to see Anal Sex 🥺 turn up as high as it did on peoples list, but in retrospect the method of tagging
			on AO3 always meant it was going to be a top contender.
			<br /><br />
			If you have questions about setting something like this up yourself, or would like to be a beta
			tester for v2, please do DM me on twitter. The account can be found in the sidebar.
			<br /><br />
			xoxo BotHermione
		</p>
	</div>
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
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	img {
		height: 100px;
	}
	.altImage {
		border-radius: 100px;
	}
	.imgWrapper {
		display: flex;
	}

	@media only screen and (max-width: 600px) {
		.container {
			width: 80%;
		}
	}
</style>
