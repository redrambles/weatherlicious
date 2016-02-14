var icons = {	
        "clear-day" : "B", 
        "clear-night" : "C", 
        "rain" : "R", 
        "snow" : "G", 
        "sleet" : "X", 
        "wind" : "S", 
        "fog" :"N", 
        "cloudy" : "Y",
        "partly-cloudy-day" : "H", 
        "partly-cloudy-night" : "I"
      };

var cities = {	
        "montreal"  : {coords: {latitude: 45.3833, longitude: -73.9833}},
        "new york" 		: 	{coords: {latitude: 40.672060, longitude:-73.983898}},
        "toronto" 	: 	{coords: {latitude: 43.7000, longitude: -79.4000}},
        "chicago" 		: 	{coords: {latitude: 41.879003, longitude: -87.63675}},
        "san francisco" : 	{coords: {latitude: 37.788531, longitude: -122.407237}},
        "miami" 		:	{coords: {latitude: 25.790176, longitude: -80.140133}},
        "current location" : {coords: {latitude: 45.3833, longitude: -73.9833}} // Defaults to Montreal
       };
       

function loadWeather(cityCoords){
  console.log(cityCoords);

  var latlng = cityCoords.coords.latitude + "," + cityCoords.coords.longitude;

  // ****** PLEASE NOTE *********
  // Register for an API key at: https://api.forecast.io/
  // And replace it in the string below
  // Without it the app will not work
  var forecastURL = "https://api.forecast.io/forecast/e7a1f0798885b9cfe1b62d793f572c2f/"+latlng;

  $.ajax({
      url: forecastURL,
      jsonpCallback: 'jsonCallback',
      contentType: "application/json",
      dataType: 'jsonp',
      success: function(json) {
         console.log(json);
         $("#current_temp").html(Math.round(json.currently.temperature)+"&#176;F | "+Math.round((json.currently.temperature - 32) / 1.8)+"&#176;C");
         $("#current_summary").html(json.currently.summary);
         $("#current_temp").attr("data-icon",icons[json.currently.icon]);

      },
      error: function(e) {
         console.log(e.message);
      }
  });

}

function loadCity(city){
  $("#location").html(city);

  if (city.toLowerCase() == "current location") {
    if ( navigator.geolocation )
      navigator.geolocation.getCurrentPosition(loadWeather,loadDefaultCity);
    else {
      loadDefaultCity();
    }

  } else {
    loadWeather(cities[city.toLowerCase()]);
  }

}

function loadDefaultCity(){
  loadCity("Montreal");
}

$(document).ready(function(){
  loadCity("Montreal");

  $("a.city").bind("click",function(){
    loadCity($(this).html());
  });
});
