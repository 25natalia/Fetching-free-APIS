document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('fetch-button').addEventListener('click', function (event) {
		event.preventDefault();
		renderCatLoadingState();
		fetchRandomCatFact();
	});

	document.getElementById('clear-button').addEventListener('click', function () {
		clearInputs();
	});

	document.getElementById('input').addEventListener('click', function (event) {
		event.preventDefault();
		renderAnimeLoadingState();
		fetchAnimeData();
	});

	document.getElementById('fetch-population-button').addEventListener('click', function (event) {
		event.preventDefault();
		renderPopulationLoadingState();
		fetchPopulationData();
	});
});

async function fetchRandomCatFact() {
	try {
		const response = await fetch('https://catfact.ninja/fact');
		if (!response.ok) {
			throw new Error('Error');
		}
		const data = await response.json();
		renderCatData(data);
	} catch (error) {
		renderCatErrorState();
	}
}

async function fetchAnimeData() {
	const limit = document.getElementById('limit_number').value;
	const search = document.getElementById('search').value;
	const type = document.getElementById('type').value;

	const url = `https://api.jikan.moe/v4/anime?q=${search}&type=${type}&limit=${limit}`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('Error');
		}
		const data = await response.json();
		renderAnimeData(data);
	} catch (error) {
		renderAnimeErrorState();
	}
}

async function fetchPopulationData() {
	try {
		const response = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
		if (!response.ok) {
			throw new Error('Error');
		}
		const data = await response.json();
		renderPopulationData(data);
	} catch (error) {
		renderPopulationErrorState();
	}
}

function renderCatLoadingState() {
	const container = document.getElementById('cat-data-container');
	container.innerHTML = '';
	container.innerHTML = '<p>Loading...</p>';
	console.log('Loading...');
}

function renderCatErrorState() {
	const container = document.getElementById('cat-data-container');
	container.innerHTML = '';
	container.innerHTML = '<p>Error</p>';
	console.log('Error');
}

function renderCatData(data) {
	const container = document.getElementById('cat-data-container');
	container.innerHTML = '';

	const div = document.createElement('div');
	div.className = 'item';
	div.innerHTML = `<p>${data.fact}</p>`;
	container.appendChild(div);
}

function renderAnimeLoadingState() {
	const container = document.getElementById('anime-data-container');
	container.innerHTML = '';
	container.innerHTML = '<p>Loading...</p>';
	console.log('Loading...');
}

function renderAnimeErrorState() {
	const container = document.getElementById('anime-data-container');
	container.innerHTML = '';
	container.innerHTML = '<p>Error</p>';
	console.log('Error');
}

function renderAnimeData(data) {
	const container = document.getElementById('anime-data-container');
	container.innerHTML = '';

	data.data.forEach((anime) => {
		const div = document.createElement('div');
		div.className = 'item';
		div.innerHTML = `
					<h3>${anime.title}</h3>
					<div class="item-content">
							<img src="${anime.images.jpg.image_url}" alt="${anime.title}">
							<div class="item-info">
									<p>${anime.synopsis}</p>
							</div>
					</div>
			`;
		container.appendChild(div);
	});
}

function renderPopulationLoadingState() {
	const container = document.getElementById('population-data-container');
	container.innerHTML = '';
	container.innerHTML = '<p>Loading...</p>';
	console.log('Loading...');
}

function renderPopulationErrorState() {
	const container = document.getElementById('population-data-container');
	container.innerHTML = '';
	container.innerHTML = '<p>Error</p>';
	console.log('Error');
}

function renderPopulationData(data) {
	const container = document.getElementById('population-data-container');
	container.innerHTML = '';

	data.data.forEach((population) => {
		const div = document.createElement('div');
		div.className = 'item';
		div.innerHTML = `
					<p>Year: ${population.Year}</p>
					<p>Population: ${population.Population}</p>
			`;
		container.appendChild(div);
	});
}

function clearInputs() {
	document.getElementById('limit_number').value = '';
	document.getElementById('search').value = '';
}
