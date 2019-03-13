console.log("Hello world !!");

//var city = "Tunis";
var cities = process.argv.slice(2)

var https = require('https');

function printMessage (city , temperature, pression){
	console.log("A " + city + ", la temperature est de " + (temperature - 273.15).toFixed(2) + "C et la pression est de " + pression + " bar");
}
cities.forEach ( function(city){
	var request = https.get("https://api.openweathermap.org/data/2.5/weather?q=" + city  + "&appid=204c7f38d675a67ea3c05eccf62f6e19", function(response){

	//console.dir(response);	

		var body = ""

		response.on('data', function(chunk){
		body += chunk;
		});	
	response.on('end', function(chunk){
		try{
			
				var data_weather = JSON.parse(body);
				printMessage(city, data_weather.main.temp, data_weather.main.pressure);
				//console.log( data_weather.main.temp);	
			

		}catch(error){
			console.error(error.message)
		}
	});
	});
});
