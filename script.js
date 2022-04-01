var list = document.querySelector("ul");
var searchFormEl = document.getElementById("searchForm");
var cityToBeSearched = document.getElementById("citySearch");
var fetchButton = document.getElementById("searchButton");
var geoAPIKey = "9044442a1482ebbe84959ed380a83fe4";
var OneCallAPIKey = "3ca88eca3a5f704be8164373cde6ffaf";
//console.log(cityToBeSearched);
var lat;
var lon;


function getApi(event) {
    //Use this when submitting form so that it prevents a full page refresh which clears the console.
    event.preventDefault();
    var city = cityToBeSearched.value.trim();
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
        console.log(data);
    });
}