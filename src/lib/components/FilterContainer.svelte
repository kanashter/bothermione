<script>
	export let open;
</script>

<div class="fixedBox">
	<div class="container">
		<div class="close" on:click={() => (open = false)}>
			<img src="/images/close.svg" alt="Close Filter" />
		</div>
		<slot />
	</div>
</div>

<style>
	.fixedBox {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: rgba(29, 29, 29, 0.801);
	}
	.container {
		position: relative;
		width: 80%;
		height: 80%;
		text-align: center;
		overflow-y: scroll;
	}
	.close {
		position: absolute;
		top: 10px;
		right: 10px;
		width: 50px;
		height: 50px;
		cursor: pointer;
	}
	img {
		width: 50px;
	}
</style>
