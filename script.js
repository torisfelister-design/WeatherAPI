const API_KEY = '741239279607c860edc681db500e15bd'; 

const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const weatherDisplay = document.getElementById('weather-display');


// -------------------- Fetch Weather --------------------
async function getWeather(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    // Show loading
    loading.classList.remove('hidden');
    error.classList.add('hidden');
    weatherDisplay.classList.add('hidden');

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the spelling.');
            } else {
                throw new Error('Failed to fetch weather data. Please try again.');
            }
        }

        const data = await response.json();
        displayWeather(data);

    } catch (err) {
        showError(err.message);

    } finally {
        loading.classList.add('hidden');
    }
}


// -------------------- Display Weather --------------------
function displayWeather(data) {

    document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temp').textContent = Math.round(data.main.temp);
    document.getElementById('feels-like').textContent = Math.round(data.main.feels_like);
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind').textContent = data.wind.speed;
    document.getElementById('description').textContent = data.weather[0].description;

    // Weather Icon
    const iconCode = data.weather[0].icon;
    document.getElementById('weather-icon').src =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherDisplay.classList.remove('hidden');
}


// -------------------- Show Error --------------------
function showError(message) {
    error.textContent = message;
    error.classList.remove('hidden');
}


// -------------------- Event Listeners --------------------
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();

    if (city) {
        getWeather(city);
    } else {
        showError('Please enter a city name');
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});


// -------------------- Default City --------------------
getWeather('London');
