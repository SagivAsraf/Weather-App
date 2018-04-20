const yargs = require('yargs');//yargs is a library inside the project.//install by npm install yargs@4.8.1 --save
const axios = require('axios'); //npm that we are install from the terminal

const weatherDataArray = require('./weather-data-manage.js');


const argv = yargs
  .options( {
    a:{
      demand: true,
      alias: 'address',
      describe: 'Adress to fetch latitude and Longitude of address',
      string: true
      } //a - address
})
.help()
.alias('help','h') //help = h ... as alias
.argv; //.argv => takes all configuratins runs thru the parameters and store in argv .

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

var address,dateOfRequest;

//axios.get got url as parameter; //then = Success
axios.get(geocodeUrl).then((response) => {
  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error("Unable to find that address");//throw error! go to the catch direcly
  }
  dateOfRequest = response.headers.date;

  var latitude = response.data.results[0].geometry.location.lat;
  var longitude = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.forecast.io/forecast/99d4d97e6eec9bf34dbd0d8f48c4e9e1/${latitude},${longitude}`;

  //console.log(response.data);

  console.log("address you chose: " ,response.data.results[0].formatted_address);
  address = response.data.results[0].formatted_address;
//add new then! call in a call! (we ask again axios.get, into response the data!)
  return axios.get(weatherUrl);
}).then((response) =>{
  var temperature =  ((response.data.currently.temperature-32) * (5/9)).toFixed(2);
  var actualTemprature = ((response.data.currently.apparentTemperature-32) * (5/9)).toFixed(2);
  var summary = response.data.currently.summary;

  console.log(`It's currently ${temperature} but feels like ${actualTemprature}`);
  console.log(`And the summary is: ${summary}`);

  var weatherData = weatherDataArray.addWeatherData(address,dateOfRequest,temperature,summary);

}).catch((e) => {
  if(e.code === 'ENOTFOUND'){
    console.log("Unable to connect to API servers");
  }
  else{
    console.log(e.message);
  }
  //console.log(e); to see whats the error we got back! in catch! and after we see, we did the if else
});

//npm axios - > library!
// npm install axiose@0.13.1 --save
 //api code 99d4d97e6eec9bf34dbd0d8f48c4e9e1 (my code)
 // https://darksky.net/dev/register -> you have to register for get your own code. (for send request to the weather site)
 //
