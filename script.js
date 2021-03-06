var list = document.querySelector("ul");
var searchFormEl = document.getElementById("searchForm");
var cityToBeSearched = document.getElementById("citySearch");
var fetchButton = document.getElementById("searchButton");
var geoAPIKey = "9044442a1482ebbe84959ed380a83fe4";
var OneCallAPIKey = "3ca88eca3a5f704be8164373cde6ffaf";
var currentWeatherEl = document.getElementById("currentWeather");
var fiveDayForecastEl = document.getElementById("fiveDayForecast");
var lat;
var lon;
var city;
var currentDateFormat;


function getApi(event) {
    //Use this when submitting form so that it prevents a full page refresh which clears the console.
    event.preventDefault();
    city = cityToBeSearched.value.trim();
    console.log(city);
    console.log("submit");
    
    // save environmental key as variable
    var requestGeocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${geoAPIKey}`;


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
    var requestOneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${OneCallAPIKey}`;
    fetch(requestOneCallUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {

        calculateTime(data.current.dt);
        printCurrentWeather(data);
        printfiveDayForecast(data);

    });
}

function calculateTime(data) {

    const currentDate = new Date(data*1000);
    const day = currentDate.getDate();
    const month = currentDate.getMonth()+1;
    const year = currentDate.getFullYear();
    currentDateFormat = `${month}/${day}/${year}`;
    return(currentDateFormat);
}

function printCurrentWeather(data) {

    console.log(data);
    //Clearing any prior content in 
    currentWeatherEl.innerHTML= "";

    var currentWeatherCardEl = document.createElement("div");
    currentWeatherCardEl.classList.add('card', 'bg-light','text-dark','mb-3','p-3');
    currentWeatherEl.append(currentWeatherCardEl);

    var currentWeatherCardBodyEl = document.createElement("div");
    currentWeatherCardBodyEl.classList.add("card-body");
    currentWeatherCardEl.append(currentWeatherCardBodyEl);

    var cityDateEl = document.createElement("h3");
    cityDateEl.classList.add("card-title");
    cityDateEl.textContent = `${city} (${currentDateFormat})`;

    var tempEl = document.createElement("p");
    tempEl.classList.add("card-text");
    tempEl.textContent = `Temp: ${data.current.temp} F`;
    
    var windEl = document.createElement("p");
    windEl.classList.add("card-text");
    windEl.textContent = `Wind: ${data.current.wind_speed} MPH`;
    
    var humidityEl = document.createElement("p");
    humidityEl.classList.add("card-text");
    humidityEl.textContent = `Humidity: ${data.current.humidity} %`;

    var uvIndexEl = document.createElement("p");
    uvIndexEl.classList.add("card-text");
    uvIndexEl.textContent = `UV Index: ${data.current.uvi}`;
    
    currentWeatherCardBodyEl.append(cityDateEl, tempEl, windEl, humidityEl, uvIndexEl);
}

function printfiveDayForecast(data) {

    fiveDayForecastEl.innerHTML = "";

    for (i=0; i<5; i++) {
        var fiveDayForecastCardEl = document.createElement("div");
        fiveDayForecastCardEl.classList.add('card', 'bg-dark','text-light','col-md-2', 'mb-1','p-1');
        fiveDayForecastEl.append(fiveDayForecastCardEl);
    
        var fiveDayForecastCardBodyEl = document.createElement("div");
        fiveDayForecastCardBodyEl.classList.add("card-body");
        fiveDayForecastCardEl.append(fiveDayForecastCardBodyEl);
    
        var cityDateEl = document.createElement("h5");
        cityDateEl.classList.add("card-title");
        currentDateFormat = calculateTime(data.daily[i].dt)
        cityDateEl.textContent = currentDateFormat;
    
        var iconEl = document.createElement("img");
        iconEl.setAttribute('src',`https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`);
        iconEl.setAttribute('height', '32px');
    
        var tempEl = document.createElement("p");
        tempEl.classList.add("card-text");
        tempEl.textContent = `Temp: ${data.daily[i].temp.day} F`;
        
        var windEl = document.createElement("p");
        windEl.classList.add("card-text");
        windEl.textContent = `Wind: ${data.daily[i].wind_speed} MPH`;
        
        var humidityEl = document.createElement("p");
        humidityEl.classList.add("card-text");
        humidityEl.textContent = `Humidity: ${data.daily[i].humidity} %`;
        
        fiveDayForecastCardBodyEl.append(cityDateEl, iconEl, tempEl, windEl, humidityEl);
    }


}