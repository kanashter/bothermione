<script>
	import { fade } from 'svelte/transition';
	export let refresh = '';
</script>

{#key refresh}
	<div in:fade={{ duration: 250, delay: 300 }} out:fade={{ duration: 250 }}>
		<slot />
	</div>
{/key}
