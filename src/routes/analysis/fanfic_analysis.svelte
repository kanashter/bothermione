<script context="module">
	export const ssr = false;
</script>

<script>
	import { loadDb, parse, format, sortData, allUniqueSorted, filterData } from '$lib/_functions';
	import { ChartContainer, FilterContainer } from '$lib/components';
	import { Datepicker } from 'svelte-calendar';
	import dayjs from 'dayjs';

	let data;
	let parsedData;
	let loaded;
	let allTags;
	let allShips;
	let allRatings;
	let parsedTags;
	let parsedShips;
	let parsedRatings;
	let parsedLanguages;
	let allLanguages;
	let selectedTags = [];
	let selectedShips = [];
	let selectedRatings = [];
	let selectedLanguages = [];
	let boundStart = dayjs('2021-01-01').toDate();
	let boundEnd = dayjs('2021-12-02').toDate();
	let start = boundStart;
	let end = boundEnd;
	let minStart = dayjs('2002-01-01').toDate();
	let maxEnd = dayjs('2021-12-02').toDate();

	let typedTags;
	let typedShips;
	let typedRatings;
	let typedLanguages;

	let showShipFilter = false;
	let showTagFilter = false;
	let showLanguageFilter = false;
	let showRatingFilter = false;

	let tagsExpanded = false;
	let shipsExpanded = false;
	let ratingsExpanded = false;
	let languagesExpanded = false;

	let dataLoaded = false;

	let filters;

	data = loadDb();

	function load() {
		loadDb().then((i) => {
			data = i;
			parsedData = data;
			loaded = sortData(parsedData);
			dataLoaded = true;
			allTags = allUniqueSorted(data, 'tags');
			allShips = allUniqueSorted(data, 'ship');
			allRatings = allUniqueSorted(data, 'rating');
			allLanguages = allUniqueSorted(data, 'language');
			parsedTags = parse.uniqueArrayObjects(parsedTags, 'tags');
			parsedShips = parse.uniqueArrayObjects(parsedData, 'ship');
			parsedRatings = parse.uniqueArrayObjects(parsedData, 'rating');
			parsedLanguages = parse.uniqueArrayObjects(parsedData, 'language');
			filters = {
				tags: [],
				ships: [],
				ratings: [],
				languages: [],
				startDate: '20210101',
				endDate: '20211202'
			};
		});
	}

	load();

	function updateShips() {
		if (typedShips == undefined || typedShips == '') {
			selectedShips = [];
		} else {
			selectedShips = parse.filterArray(allShips, typedShips);
		}
	}

	function updateTags() {
		if (typedTags == undefined || typedTags == '') {
			selectedTags = [];
		} else {
			selectedTags = parse.filterArray(allTags, typedTags);
		}
	}

	function updateLanguages() {
		if (typedLanguages == undefined || typedLanguages == '') {
			selectedLanguages = [];
		} else {
			selectedLanguages = parse.filterArray(allLanguages, typedLanguages);
		}
	}

	function updateRatings() {
		if (typedRatings == undefined || typedRatings == '') {
			selectedRatings = [];
		} else {
			selectedRatings = parse.filterArray(allRatings, typedRatings);
		}
	}

	function selectAll(type) {
		let selectedVariable;
		if (type == 'ships') {
			selectedVariable = selectedShips;
		} else if (type == 'tags') {
			selectedVariable = selectedTags;
		} else if (type == 'languages') {
			selectedVariable = selectedLanguages;
		} else {
			selectedVariable = selectedRatings;
		}

		let tempArray = [];
		filters[type] = [];
		for (let i in selectedVariable) {
			tempArray.push(selectedVariable[i]);
		}
		filters[type] = tempArray;
	}

	function unselectAll(type) {
		filters[type] = [];
	}

	function updateData() {
		if (filters) {
			parsedData = filterData(data, filters);
			loaded = sortData(parsedData);
			dataLoaded = true;
			allTags = allUniqueSorted(data, 'tags');
			allShips = allUniqueSorted(data, 'ship');
			allRatings = allUniqueSorted(data, 'rating');
			allLanguages = allUniqueSorted(data, 'language');
			parsedTags = parse.uniqueArrayObjects(parsedData, 'tags');
			parsedShips = parse.uniqueArrayObjects(parsedData, 'ship');
			parsedRatings = parse.uniqueArrayObjects(parsedData, 'rating');
			parsedLanguages = parse.uniqueArrayObjects(parsedData, 'language');
		}
	}

	function updateStartDate() {
		if (boundStart != start) {
			const stringDate = dayjs(start).format('YYYYMMDD');
			boundStart = start;
			filters['startDate'] = stringDate;
			updateData();
		}
	}

	function updateEndDate() {
		if (boundEnd != end) {
			const stringDate = dayjs(end).format('YYYYMMDD');
			boundStart = end;
			filters['endDate'] = stringDate;
			updateData();
		}
	}

	function pushToFilter(item, type) {
		if (!filters[type].includes(item)) {
			filters[type].push(item);
		} else {
			filters[type] = filters[type].filter((e) => e != item);
		}

		if (type == 'ships') {
			typedShips += ' ';
			typedShips = typedShips.substring(0, typedShips.length - 1);
		} else if (type == 'tags') {
			typedTags += ' ';
			typedTags = typedTags.substring(0, typedTags.length - 1);
		} else if (type == 'languages') {
			typedLanguages += ' ';
			typedLanguages = typedLanguages.substring(0, typedLanguages.length - 1);
		} else if (type == 'ratings') {
			typedRatings += ' ';
			typedRatings = typedRatings.substring(0, typedRatings.length - 1);
		}
		filters[type] = filters[type];
	}

	function buttonCheck(item, type) {
		if (filters[type].includes(item)) {
			return true;
		} else {
			return false;
		}
	}

	$: typedShips, updateShips();
	$: typedTags, updateTags();
	$: typedLanguages, updateLanguages();
	$: typedRatings, updateRatings();
	$: filters, updateData();
	$: start, updateStartDate();
	$: end, updateEndDate();

	let theme = {
		calendar: {
			width: '700px',
			maxWidth: '100vw',
			legend: {
				height: '45px'
			},
			shadow: '0px 10px 26px rgba(0, 0, 0, 0.25)',
			colors: {
				text: {
					primary: '#eee',
					highlight: '#fff'
				},
				background: {
					primary: '#333',
					highlight: '#5829d6',
					hover: '#222'
				},
				border: '#222'
			},
			font: {
				regular: '1.5em',
				large: '37em'
			},
			grid: {
				disabledOpacity: '.5',
				outsiderOpacity: '.7'
			}
		}
	};
</script>

<svelte:head>
	<title>BotHermione - Fanfic Analysis</title>
</svelte:head>
<div class="wrapper">
	<div class="container">
		{#if dataLoaded}
			<div class="titleContainer">
				<div class="col">
					<h1>Analysis</h1>
					<img src="/images/logo.jpg" alt="@BotHermione" />
					<h1>Filters</h1>
					<div>
						<p>Start Date</p>
						<Datepicker bind:selected={start} bind:start={minStart} bind:end={maxEnd} {theme} />
					</div>
					<div>
						<p>End Date</p>
						<Datepicker bind:selected={end} bind:start={minStart} bind:end={maxEnd} {theme} />
					</div>
					<div class="filterButtons">
						<button class="filterButton" on:click={() => (showShipFilter = true)}
							>Show Ship Filters</button
						>
						<button class="filterButton" on:click={() => (showTagFilter = true)}
							>Show Tag Filters</button
						>
						<button class="filterButton" on:click={() => (showRatingFilter = true)}
							>Show Rating Filters</button
						>
						<button class="filterButton" on:click={() => (showLanguageFilter = true)}
							>Show Language Filters</button
						>
					</div>
					{#if filters.ships.length != 0}
						<p>Ships</p>
						<div class="tinyContainer">
							{#each filters.ships as ship}
								<p class="tiny">{ship}</p>
							{/each}
						</div>
					{/if}
					{#if filters.tags.length != 0}
						<p>Tags</p>
						<div class="tinyContainer">
							{#each filters.tags as ship}
								<p class="tiny">{ship}</p>
							{/each}
						</div>
					{/if}
					{#if filters.ratings.length != 0}
						<p>Ratings</p>
						<div class="tinyContainer">
							{#each filters.ratings as ship}
								<p class="tiny">{ship}</p>
							{/each}
						</div>
					{/if}
					{#if filters.languages.length != 0}
						<p>Ships</p>
						<div class="tinyContainer">
							{#each filters.languages as ship}
								<p class="tiny">{ship}</p>
							{/each}
						</div>
					{/if}
				</div>
				<div class="col details">
					<p>Fanfics: {format.commaNum(loaded.totalFics)}</p>
					<p>Words: {format.commaNum(loaded.totalWords)}</p>
					<p>Kudos: {format.commaNum(loaded.totalKudos)}</p>
					<p>Comments: {format.commaNum(loaded.totalComments)}</p>
					<p>Tags: {format.commaNum(loaded.totalTags)}</p>
					<p>Hits: {format.commaNum(loaded.totalHits)}</p>
					<p>Pairings: {format.commaNum(loaded.totalPairings)}</p>
					<p>Languages: {format.commaNum(loaded.totalLanguages)}</p>
				</div>
			</div>
			<ChartContainer data={loaded.dateChart} title="Over Time" type="line" />

			<div class="titleContainer">
				<div class="col">
					<ChartContainer
						data={parse.loadChartData(loaded.shipArrays)}
						title="Ship Breakdown"
						type="pie"
					/>
				</div>
				<div class="col">
					<ChartContainer
						data={parse.loadChartData(loaded.ratingArrays)}
						title="Ratings"
						type="pie"
					/>
				</div>
			</div>
			<div class="titleContainer">
				<div class="col">
					<ChartContainer
						data={parse.loadChartData(loaded.languageArrays)}
						title="Language"
						type="pie"
					/>
				</div>
				<div class="col">
					<ChartContainer data={parse.loadChartData(loaded.tagArray)} title="Tags" type="pie" />
				</div>
			</div>
			<button class="filterButton" on:click={() => (shipsExpanded = !shipsExpanded)}
				>Show All Ships</button
			>
			{#if shipsExpanded}
				<div class="tinyContainer">
					{#each parsedShips as tag}
						<p class="notChosen">{tag.name}: {tag.value}</p>
					{/each}
				</div>
			{/if}

			<button class="filterButton" on:click={() => (tagsExpanded = !tagsExpanded)}
				>Show All Tags</button
			>
			{#if tagsExpanded}
				<div class="tinyContainer">
					{#each parsedTags as tag}
						<p class="notChosen">{tag.name}: {tag.value}</p>
					{/each}
				</div>
			{/if}

			<button class="filterButton" on:click={() => (languagesExpanded = !languagesExpanded)}
				>Show All Languages</button
			>
			{#if languagesExpanded}
				<div class="tinyContainer">
					{#each parsedLanguages as tag}
						<p class="notChosen">{tag.name}: {tag.value}</p>
					{/each}
				</div>
			{/if}

			<button class="filterButton" on:click={() => (ratingsExpanded = !ratingsExpanded)}
				>Show All Ratings</button
			>
			{#if ratingsExpanded}
				<div class="tinyContainer">
					{#each parsedRatings as tag}
						<p class="notChosen">{tag.name}: {tag.value}</p>
					{/each}
				</div>
			{/if}

			{#if showShipFilter}
				<FilterContainer bind:open={showShipFilter}>
					<h1>Search Ship Filters</h1>
					<input bind:value={typedShips} />
					{#if typedShips}
						<div class="tinyContainer">
							{#each selectedShips as ship}
								{#if buttonCheck(ship, 'ships')}
									<button class="chosen" on:click={() => pushToFilter(ship, 'ships')}>{ship}</button
									>
								{:else}
									<button class="notChosen" on:click={() => pushToFilter(ship, 'ships')}
										>{ship}</button
									>
								{/if}
							{/each}
						</div>
						<button class="notChosen" on:click={() => selectAll('ships')}>Select All</button>
						<button class="chosen" on:click={() => unselectAll('ships')}>Deselect All</button>
					{/if}
				</FilterContainer>
			{/if}

			{#if showTagFilter}
				<FilterContainer bind:open={showTagFilter}>
					<h1>Search Tag Filters</h1>
					<input bind:value={typedTags} />
					{#if typedTags}
						<div class="tinyContainer">
							{#each selectedTags as tag}
								{#if buttonCheck(tag, 'tags')}
									<button class="chosen" on:click={() => pushToFilter(tag, 'tags')}>{tag}</button>
								{:else}
									<button class="notChosen" on:click={() => pushToFilter(tag, 'tags')}>{tag}</button
									>
								{/if}
							{/each}
						</div>
						<button class="notChosen" on:click={() => selectAll('tags')}>Select All</button>
						<button class="chosen" on:click={() => unselectAll('tags')}>Deselect All</button>
					{/if}
				</FilterContainer>
			{/if}

			{#if showLanguageFilter}
				<FilterContainer bind:open={showLanguageFilter}>
					<h1>Search Language Filters</h1>
					<input bind:value={typedLanguages} />
					{#if typedLanguages}
						<div class="tinyContainer">
							{#each selectedLanguages as language}
								{#if buttonCheck(language, 'languages')}
									<button class="chosen" on:click={() => pushToFilter(language, 'languages')}
										>{language}</button
									>
								{:else}
									<button class="notChosen" on:click={() => pushToFilter(language, 'languages')}
										>{language}</button
									>
								{/if}
							{/each}
						</div>
						<button class="notChosen" on:click={() => selectAll('languages')}>Select All</button>
						<button class="chosen" on:click={() => unselectAll('languages')}>Deselect All</button>
					{/if}
				</FilterContainer>
			{/if}

			{#if showRatingFilter}
				<FilterContainer bind:open={showRatingFilter}>
					<h1>Search Rating Filters</h1>
					<input bind:value={typedRatings} />
					{#if typedRatings}
						<div class="tinyContainer">
							{#each selectedRatings as rating}
								{#if buttonCheck(rating, 'ratings')}
									<button class="chosen" on:click={() => pushToFilter(rating, 'ratings')}
										>{rating}</button
									>
								{:else}
									<button class="notChosen" on:click={() => pushToFilter(rating, 'ratings')}
										>{rating}</button
									>
								{/if}
							{/each}
						</div>
						<button class="notChosen" on:click={() => selectAll('ratings')}>Select All</button>
						<button class="chosen" on:click={() => unselectAll('ratings')}>Deselect All</button>
					{/if}
				</FilterContainer>
			{/if}
		{:else}
			<p>Loading</p>
		{/if}
	</div>
</div>

<style>
	.wrapper {
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.container {
		width: 60%;
	}
	.titleContainer {
		display: flex;
		justify-content: space-between;
	}
	.col {
		width: 50%;
	}
	img {
		width: 100px;
		border-radius: 100px;
	}
	.tinyContainer {
		display: flex;
		flex-wrap: wrap;
	}
	.tiny {
		font-size: 0.8rem;
		margin-right: 0.6rem;
	}
	.filterButtons {
		display: flex;
		flex-direction: column;
		margin-top: 2rem;
	}
	.filterButton {
		border: 0px solid white;
		border-bottom: 1px solid white;
		background-color: rgba(0, 255, 255, 0);
		color: white;
		font-family: var(--sans-font);
		font-size: 1rem;
		margin-bottom: 1rem;
		width: 50%;
		cursor: pointer;
	}
	.filterButton:hover {
		background-color: white;
		color: black;
	}
	p {
		font-family: var(--sans-font);
	}
	h1 {
		font-family: var(--serif-font);
	}
	.details {
		font-size: 2rem;
		text-align: right;
	}
	input {
		width: 80%;
		margin-bottom: 2rem;
		background-color: rgba(0, 0, 0, 0);
		color: white;
		font-size: 2rem;
		font-family: var(--serif-font);
		border: 0px solid white;
		border-bottom: 1px solid white;
		text-align: center;
	}
	input:focus {
		outline: none;
		border-bottom: 1px solid aqua;
	}
	.notChosen {
		background-color: rgba(0, 0, 0, 0);
		color: white;
		border: 1px solid aqua;
		margin-bottom: 1rem;
		margin-right: 1rem;
		font-family: var(--sans-font);
		cursor: pointer;
		padding: 3px;
		font-size: 0.9rem;
	}
	.notChosen:hover {
		background-color: aqua;
		color: rgb(122, 0, 0);
	}
	.chosen {
		background-color: rgba(0, 0, 0, 0);
		color: white;
		border: 1px solid red;
		margin-bottom: 1rem;
		margin-right: 1rem;
		font-family: var(--sans-font);
		cursor: pointer;
		padding: 3px;
		font-size: 0.9rem;
	}
	.chosen:hover {
		background-color: red;
		color: white;
	}
	@media only screen and (max-width: 600px) {
		.titleContainer {
			flex-direction: column;
		}
		.col {
			width: 100%;
		}
	}
</style>
