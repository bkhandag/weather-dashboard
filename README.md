# weather-dashboard

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Link to Application:
<!--  -->

## Pseudo Code:
1. Upon page load, hide all layout except the search capability
1. Take input from user on city required
1. Write an event listener for search button press to utilize the Geocoding API
1. The geocoding API must return with the informaiton on city selected
1. Then populate the searched city to the history menu on left
1. Make an API call to Open Weather One Call
1. Populate the body of webpage with todays weather for selected city
1. Populate body of webpage for 5 day weather forcast for selected city
1. Toggle between cities in "history"

## Screenshot
<!-- !["Work Day Scheduler".](work_day_scheduler.png) -->
