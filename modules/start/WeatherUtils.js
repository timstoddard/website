let successFn = () => { };
let reloadWeatherTimer = null;

// Lat/long data currently stays until manually reset
let hasLocationDataInLocalStorage = () => get('locationData') !== null;
let hasWeatherDataInLocalStorage = () => get('weatherData') !== null && get('weatherDataTimestamp') !== null;

/**
 * Returns true if the timestamp is more than an
 * 15 mins old, or if a new hour has started since
 * the timestamp was set; false otherwise.
 */
function needNewWeatherData() {
  let time1 = new Date();
  let time2 = new Date(parseInt(get('weatherDataTimestamp'), 10));
  let timeDifferenceInMinutes = Math.floor(Math.abs(time2 - time1) / (60 * 1000));
  return timeDifferenceInMinutes > 15 ? true : time1.getHours() !== time2.getHours();
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        let locationData = `${location.coords.latitude},${location.coords.longitude}`;
        getWeatherData(locationData);
        set('locationData', locationData);
      },
      () => getZipCode(),
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 });
  } else {
    getZipCode();
  }
}

function getZipCode() {
  let zipCode = prompt('There was an error determining your location.\nPlease enter your 5 digit zip code.');
  if (zipCode !== null) {
    while (!(zipCode.match(/\d{5}/) || zipCode.match(/\d{5}[- ]?\d{4}/))) {
      zipCode = prompt('The zip code you entered is invalid.\nPlease enter your 5 digit zip code.');
    }
    getWeatherData(zipCode);
    set('locationData', zipCode);
  }
}

function getWeatherData(locationData) {
  locationData = 'autoip'; // TODO: add ability to switch to navigator.geolocation instead
  getWeatherDataAjax(`https://api.wunderground.com/api/8d7d14e295f9150a/conditions/forecast10day/astronomy/q/${locationData}.json`);
  reloadWeatherTimer = setInterval(() => {
    getWeatherDataAjax(`https://api.wunderground.com/api/8d7d14e295f9150a/conditions/forecast10day/astronomy/q/${locationData}.json`);
  }, 900000);
}

function getWeatherDataAjax(url) {
  $.ajax({
    url: url,
    type: 'GET',
    success: successFn,
    error: () => console.log('weather data failed to load'),
    timeout: 30000
  });
}

export let showWeather = (success) => {
  successFn = success;
  // if (hasLocationDataInLocalStorage()) {
    if (hasWeatherDataInLocalStorage()) {
      if (!needNewWeatherData()) {
        successFn(get('weatherData'));
      } else {
        getWeatherData(get('locationData'));
      }
    } else {
      getWeatherData(get('locationData'));
    }
  // } else {
  //   getLocation();
  // }
};

export let reloadWeatherData = () => {
  localStorage.removeItem('locationData');
  localStorage.removeItem('weatherData');
  localStorage.removeItem('weatherDataTimestamp');
  getLocation();
}

export let get = (key) => JSON.parse(localStorage.getItem(key));
export let set = (key, item) => localStorage.setItem(key, JSON.stringify(item));
export let secureImg = (img) => `https://icons.wxug.com/i/c/v4/${img}.svg`;
export let cancelReloadWeatherTimer = () => clearInterval(reloadWeatherTimer);
