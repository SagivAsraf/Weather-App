const fs = require('fs');

var fetchWeatherResults = () => {
  //need try catch for the file.
  try{
      var weatherData = fs.readFileSync('weather-data.json');
      return JSON.parse(weatherData);
  } catch (errorArgument) {
    /*nothing here cause if file doesnt exist its ok
     cause its first time! after it doesnt enter!*/
     return []; 
  }
  /*^ I want to add more than one weather data, so
   I have to read from the file, put in the weather data array
   and then just parse to obj (array),and then push the new one!  */

};

var saveWeatherData = (weatherDataArray) => {
  fs.writeFileSync('weather-data.json',JSON.stringify(weatherDataArray));
};


var addWeatherData = (address,date,temperature,summary) => {
  var weatherDataArray = fetchWeatherResults();
  var weatherData = {
    address,
    date,
    temperature,
    summary
  };

    weatherDataArray.push(weatherData); // enter weatherData to the array
    saveWeatherData(weatherDataArray);
    return weatherData;
};

var getAll = () => {
  var weatherDataArray = fetchWeatherResults();
  return weatherDataArray;
  /*all function can be:
   return fetchWeatherResults()*/
};

// for use it in app.js!!! without this : "function doesnt exist..."
module.exports = {
  addWeatherData,
  getAll,
};
