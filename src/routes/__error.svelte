<div class="wrapper">
	<div class="container">
		<h1>UH OH</h1>
		<p>Looks like something went wrong when trying to load the page!</p>
		<a href="/">Better go back</a>
		<img src="/images/lmao.jpg" alt="lmao" />
	</div>
</div>

<style>
	.wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.container {
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	h1 {
		font-family: var(--serif-font);
		font-size: 4rem;
	}
	p {
		font-family: var(--sans-font);
	}
	a {
		text-decoration: underline;
		font-family: var(--sans-font);
	}
	img {
		width: 100%;
		object-fit: contain;
	}
</style>
