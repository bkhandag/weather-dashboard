var list = document.querySelector("ul");
var searchFormEl = document.getElementById("searchForm");
var cityToBeSearched = document.getElementById("citySearch");
var fetchButton = document.getElementById("searchButton");
var geoAPIKey = "9044442a1482ebbe84959ed380a83fe4";
var OneCallAPIKey = "3ca88eca3a5f704be8164373cde6ffaf";
var currentWeatherEl = document.getElementById("currentWeather");
//console.log(cityToBeSearched);
var lat;
var lon;
var city;


function getApi(event) {
    //Use this when submitting form so that it prevents a full page refresh which clears the console.
    event.preventDefault();
    city = cityToBeSearched.value.trim();
    console.log(city);
    console.log("submit");
    
    // save environmental key as variable
    var requestGeocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${geoAPIKey}`;


  fetch(requestGeocodingUrl)
    .then(function (response) {
        //console.log(response.json());
      return response.json();
    }) 
    .then(function(data) {
        lat = data[0].lat;
        lon = data[0].lon;
        console.log(data);
        console.log(data[0].lon);
        console.log(`${lat} and ${lon}`);
        newAPICall(lat,lon);
        
    })  
}

searchFormEl.addEventListener('submit', getApi);

function newAPICall(lat,lon) {
    var requestOneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${OneCallAPIKey}`;
    fetch(requestOneCallUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        printCurrentWeather(data);
    });
}

function printCurrentWeather(data) {

    console.log(data);
    var currentWeatherCardEl = document.createElement("div");
    currentWeatherCardEl.classList.add('card', 'bg-light','text-dark','mb-3','p-3');
    currentWeatherEl.append(currentWeatherCardEl);

    var currentWeatherCardBodyEl = document.createElement("div");
    currentWeatherCardBodyEl.classList.add("card-body");
    currentWeatherCardEl.append(currentWeatherCardBodyEl);

    var cityDateEl = document.createElement("h3");
    cityDateEl.classList.add("card-title");
    cityDateEl.textContent = city;

    var tempEl = document.createElement("p");
    tempEl.classList.add("card-text");
    tempEl.textContent = `Temperature: ${data.current.temp}`;
    
    var windEl = document.createElement("p");
    windEl.classList.add("card-text");
    windEl.textContent = `Wind Speed: ${data.current.wind_speed}`;
    
    var humidityEl = document.createElement("p");
    humidityEl.classList.add("card-text");
    humidityEl.textContent = `Humidity: ${data.current.humidity}`;

    var uvIndexEl = document.createElement("p");
    uvIndexEl.classList.add("card-text");
    uvIndexEl.textContent = `UV Index: ${data.current.uvi}`;
    
    currentWeatherCardBodyEl.append(cityDateEl, tempEl, windEl, humidityEl, uvIndexEl);
}