import dayjs from 'dayjs';

async function loadDb() {
	const load = await fetch('https://bothermione.com/shrunk_db.json');
	let res = await load.json();
	return res;
}

function sortData(array) {
	const totalWords = parse.countTotal(array, 'words');
	const totalKudos = parse.countTotal(array, 'kudos');
	const totalComments = parse.countTotal(array, 'comments');
	const totalHits = parse.countTotal(array, 'hits');
	const totalFics = Object.keys(array).length;
	const shipArrays = parse.uniqueArray(array, 'ship');
	const ratingArrays = parse.uniqueArray(array, 'rating');
	const languageArrays = parse.uniqueArray(array, 'language');
	const totalPairings = shipArrays[0].length;
	const totalLanguages = languageArrays[0].length;
	const tagArray = parse.filterFreeforms(array);
	const totalTags = tagArray[0].length;
	const allDates = parse.uniqueArray(array, 'datetime');
	const dateChart = parse.loadTimeSeries(allDates);
	return {
		totalWords,
		totalKudos,
		totalComments,
		totalHits,
		totalFics,
		shipArrays,
		ratingArrays,
		languageArrays,
		totalPairings,
		totalLanguages,
		tagArray,
		totalTags,
		dateChart
	};
}

function smallParse(data, array, place) {
	let tempObj = {};
	Object.keys(data).map((item) => {
		const serviceData = data[item];
		if (array.length != 0) {
			if (array.includes(serviceData[place])) {
				tempObj[item] = serviceData;
			}
		} else {
			tempObj[item] = serviceData;
		}
	});
	return tempObj;
}

function largerParse(data, array, place) {
	let tempObj = {};
	Object.keys(data).map((item) => {
		const serviceData = data[item];
		if (array.length != 0) {
			if (array.some((r) => serviceData[place].indexOf(r) >= 0)) {
				tempObj[item] = serviceData;
			}
		} else {
			tempObj[item] = serviceData;
		}
	});
	return tempObj;
}

function dateLargerParse(data, selectedDate) {
	let tempObj = {};
	Object.keys(data).map((item) => {
		const serviceData = data[item];
		const serviceDate = dayjs(serviceData.datetime);
		const dateCheck = dayjs(selectedDate);
		if (serviceDate >= dateCheck) {
			tempObj[item] = serviceData;
		}
	});
	return tempObj;
}

function dateSmallerParse(data, selectedDate) {
	let tempObj = {};
	Object.keys(data).map((item) => {
		const serviceData = data[item];
		const serviceDate = dayjs(serviceData.datetime);
		const dateCheck = dayjs(selectedDate);
		if (serviceDate <= dateCheck) {
			tempObj[item] = serviceData;
		}
	});
	return tempObj;
}

function filterData(data, filters) {
	let tempObj;

	tempObj = largerParse(data, filters.tags, 'tags');
	tempObj = smallParse(tempObj, filters.ships, 'ship');
	tempObj = smallParse(tempObj, filters.ratings, 'rating');
	tempObj = smallParse(tempObj, filters.languages, 'language');
	tempObj = dateLargerParse(tempObj, filters.startDate);
	tempObj = dateSmallerParse(tempObj, filters.endDate);

	return tempObj;
}

function allUniqueSorted(data, field) {
	let tempObj = {};
	let tempArray = [];
	let returnArray = [];
	for (let i in data) {
		const selection = data[i][field];
		if (field == 'tags') {
			for (let j in selection) {
				const tag = selection[j];
				tempObj[tag] = tempObj[j] + 1 || 1;
			}
		} else {
			tempObj[selection] = tempObj[selection] + 1 || 1;
		}
	}
	for (let i in tempObj) {
		tempArray.push({ name: i, value: tempObj[i] });
	}
	tempArray.sort((a, b) => (a.value < b.value ? 1 : -1));
	for (let i in tempArray) {
		returnArray.push(tempArray[i].name);
	}

	return returnArray;
}

const parse = {
	countTotal: (array, field) => {
		let total = 0;
		for (let i in array) {
			total += array[i][field];
		}
		return total;
	},
	filterFreeforms: (array) => {
		const returnArray = {};
		for (let i in array) {
			const selection = array[i]['tags'];
			for (let j in selection) {
				const tag = selection[j];
				returnArray[tag] = returnArray[tag] + 1 || 1;
			}
		}
		let nameArray = Object.keys(returnArray);
		let valueArray = Object.values(returnArray);
		return [nameArray, valueArray];
	},
	uniqueArray: (array, field) => {
		let returnArray = {};
		for (let i in array) {
			const selection = array[i][field];
			returnArray[selection] = returnArray[selection] + 1 || 1;
		}
		let nameArray = Object.keys(returnArray);
		let valueArray = Object.values(returnArray);

		return [nameArray, valueArray];
	},
	uniqueArrayObjects: (array, sel) => {
		let returnArray = {};
		let tempArray = [];

		for (let i in array) {
			const selection = array[i][sel];
			if (sel == 'tags') {
				for (let t in selection) {
					const tag = selection[t];
					returnArray[tag] = returnArray[tag] + 1 || 1;
				}
			} else {
				returnArray[selection] = returnArray[selection] + 1 || 1;
			}
		}
		for (let i in returnArray) {
			tempArray.push({ name: i, value: returnArray[i] });
		}
		tempArray.sort((a, b) => (a.value < b.value ? 1 : -1));
		return tempArray;
	},
	loadTimeSeries: (arr) => {
		const dates = arr[0];
		const values = arr[1];
		let tempObj = {};
		const tempDates = [];
		const tempValues = [];
		for (let i in dates) {
			const date = dayjs(dates[i]).format('YYYYMMDD');
			const value = values[i];
			tempObj[date] = value;
		}
		const ordered = Object.keys(tempObj)
			.sort()
			.reduce((obj, key) => {
				obj[key] = tempObj[key];
				return obj;
			}, {});
		const orderedKeys = Object.keys(ordered);
		const startDate = dayjs(orderedKeys[0]);
		const endDate = dayjs(orderedKeys[orderedKeys.length - 1]);
		const dateArr = [];
		let c = startDate;
		while (c <= endDate) {
			const strDate = c.format('YYYYMMDD');
			dateArr.push(strDate);
			c = dayjs(c).add(1, 'day');
		}
		for (let i in dateArr) {
			const dateCheck = dateArr[i];
			if (tempObj[dateCheck]) {
				tempDates.push(dateCheck);
				tempValues.push(tempObj[dateCheck]);
			} else {
				tempDates.push(dateCheck);
				tempValues.push(0);
			}
		}
		const data = {
			labels: tempDates,
			datasets: [
				{
					values: tempValues
				}
			]
		};
		return data;
	},
	loadChartData: (arrays) => {
		const data = {
			labels: arrays[0],
			datasets: [
				{
					values: arrays[1]
				}
			]
		};
		return data;
	},
	checkYear: (array) => {
		const returnArray = [];
		const dateCheck = dayjs('2021-01-01');
		for (let i in array) {
			let check = dayjs(array[i].datetime);
			if (check >= dateCheck) {
				returnArray.push(array[i]);
			}
		}
		return returnArray;
	},
	filterArray: (array, string) => {
		const returnArray = [];
		for (let i in array) {
			if (array[i].toLowerCase().includes(string.toLowerCase())) {
				returnArray.push(array[i]);
			}
		}
		return returnArray.slice(0, 999);
	}
};

const format = {
	commaNum: (num) => {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
};

export { loadDb, parse, format, sortData, allUniqueSorted, filterData };
