const cityName = document.querySelector('.city_name');
const wStatus = document.querySelector('.w_status');
const wTemp = document.querySelector('.w_temp');
const wDesc = document.querySelector('.w_desc');
const wFeelLike = document.querySelector('.feelLike');
const windSpeed = document.querySelector('.wind_speed');
const searchBtn = document.querySelector('.search_btn');
const searchBar = document.querySelector('.w_search');
const alertClose = document.querySelector('.alert_close');
const alertBox = document.querySelector('.alert_box');

const _key = '555f383d316991e10010f09712f05a69';

myWeather('Bengaluru', 12.9569, 77.7011, _key)

async function setCity(city, key) {
    const findCity = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=2&appid=${key}`);
    const response = await findCity.json();
    // try {
    let geoData = {
        name: response[0].name,
        _lat: response[0].lat,
        _lon: response[0].lon
    }
    return geoData;
    // } catch (error) {
    // alertBox.classList.remove('hide')
    // }
}

async function myWeather(name, lat, lon, key) {
    const wReport = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
    const report = await wReport.json();
    cityName.innerText = name;
    wStatus.innerText = report.weather[0].main;
    wTemp.innerText = Math.round(report.main.temp) + '°';
    wDesc.innerText = report.weather[0].description;
    wFeelLike.innerText = Math.round(report.main.feels_like);
    windSpeed.innerText = Math.round(report.wind.speed * 3.6);
}

function searchWeather() {
    if (searchBar.value) {
        let city = searchBar.value;
        city = city.trim();
        let geo = setCity(city, _key);
        geo.then(data => {
            const { name, _lat, _lon } = data;
            myWeather(name, _lat, _lon, _key)
            alertBox.classList.add('hide')
        }).catch(err => {
            alertBox.classList.remove('hide')
        })
        searchBar.value = ''
    }
}

searchBtn.addEventListener('click', () => {
    searchWeather()
})
searchBar.addEventListener('keydown', (e) => {
    if(e.key == 'Enter'){
        searchWeather() 
    }
})

alertClose.addEventListener('click', () => {
    alertBox.classList.add('hide')
})