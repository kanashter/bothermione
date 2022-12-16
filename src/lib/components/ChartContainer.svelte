<script>
	import Chart from 'svelte-frappe-charts';
	import dayjs from 'dayjs';
	export let data;
	export let type;
	export let title;

	const axisOptions = {
		xAxisMode: 'ticks',
		xIsSeries: 1,
		shortenYAxisNumbers: true
	};

	const lineOptions = {
		hideDots: 1,
		spline: 1
	};

	function dateTooltipCheck(d) {
		return dayjs(d).format('D MMM YY');
	}

	const tooltipOptions = {
		formatTooltipX: (d) => dateTooltipCheck(d),
		formatTooltipY: (d) => {
			return `${d} Fics Written`;
		}
	};
</script>

<div class="container">
	{#if type == 'pie'}
		<h1>{title}</h1>
		<Chart {data} type="pie" maxSlices="11" />
	{:else}
		<h1>{title}</h1>
		<Chart {data} {lineOptions} {axisOptions} {tooltipOptions} type="line" />
	{/if}
</div>

<style>
	h1 {
		font-family: var(--serif-font);
		color: rgb(45, 42, 42);
	}
	.container {
		margin-bottom: 2rem;
		margin-top: 5rem;
	}
</style>
