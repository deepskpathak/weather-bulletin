'use strict';

const weatherAPIKey = '8ae738de11128edaa2aad0c334cd1e37'; // move to .env file or gitignore for production
const openWeatherBaseURL = 'https://api.openweathermap.org/data/2.5';
const cacheTime = 10; // in minutes


function getWeather(position){
    let weatherURL = `${openWeatherBaseURL}/weather?APPID=${weatherAPIKey}`

    // Check if cache should be used
    if(useCache(localGet('weather_ts'))){
        let cache = localGet('weather');
        if(cache){
            return new Promise(
                resolve => resolve(JSON.parse(cache))
            )
        }
    }else{
        let appendLocation = '';

        if('latitude' in position && 'longitude' in position){
            appendLocation = `&lat=${position.latitude}&lon=${position.longitude}`;
        }else if('zipcode' in position && 'country' in position){
            appendLocation = `&zip=${position.zipcode},${position.country}`;
        }

        return fetch(weatherURL + appendLocation, { method: 'GET' })
            .then(response => response.json())
            .then(function(response){
                if(response.cod != 200){
                    return Promise.reject(response.message);
                }else{
                    localSave('weather',JSON.stringify(response));
                    localSave('weather_ts',new Date());
                    return response;
                }
            })
            .catch(function(error){
                console.error('Error:', error);
                alert(error);
            });
    }

}

function getForecast(position){
    let forecastURL = `${openWeatherBaseURL}/forecast?APPID=${weatherAPIKey}`;

    // Check if cache should be used
    if(useCache(localGet('forecast_ts'))){
        let cache = localGet('forecast');
        if(cache){
            return new Promise(
                resolve => resolve(JSON.parse(cache))
            )
        }
    }else{
        let appendLocation = '';

        if('latitude' in position && 'longitude' in position){
            appendLocation = `&lat=${position.latitude}&lon=${position.longitude}`;
        }else if('zipcode' in position && 'country' in position){
            appendLocation = `&zip=${position.zipcode},${position.country}`;
        }

        return fetch(forecastURL + appendLocation, { method: 'GET' })
            .then(response => response.json())
            .then(function(response){
                if(response.cod != 200){
                    return Promise.reject(response.message);
                }else{
                    // generate daily averages
                    response.days = createDailyFromHourly(response.list);

                    localSave('forecast',JSON.stringify(response));
                    localSave('forecast_ts',new Date());
                    return response;
                }
            })
            .catch(function(error){
                console.error('Error:', error);
                alert(error);
            });
    }

}

function useCache(timestamp){
    if(timestamp){
        let savedTime = Date.parse(timestamp);
        let now = new Date().getTime();
        return ( Math.floor(( (now - savedTime) / 1000) / 60) < cacheTime);
    }else{
        return false;
    }
}

function createDailyFromHourly(forecastList){

    let daysOfTheWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    let forecasts = [], // array of days
        currentDate = '',
        day = {
            codes: []
        };

    forecastList.forEach(function(forecast, index) {

        // convert forecast to date
        let date = convertTimestamp(forecast.dt).getDate();

        if(currentDate == date){

            if(day.maxTemp < forecast.main.temp_max){ day.maxTemp = forecast.main.temp_max; }
            if(day.minTemp > forecast.main.temp_min){ day.minTemp = forecast.main.temp_min; }
            day.codes.push(forecast.weather[0].id);

        }else{

            if( index != 0){
                // Find most used weather code
                day.icon = findMostFrequent(day.codes);

                forecasts.push({
                    date: day.date,
                    dayOfWeek: daysOfTheWeek[convertTimestamp(forecast.dt).getDay()],
                    maxTemp: day.maxTemp,
                    minTemp: day.minTemp,
                    codes: day.codes,
                    icon: day.icon
                });
            }

            // Go to new day
            currentDate = date;
            day.date = date;
            day.maxTemp = forecast.main.temp_max;
            day.minTemp = forecast.main.temp_min;
            day.codes = [];
            day.codes.push(forecast.weather[0].id);
        }

    });

    return forecasts;
}

function findMostFrequent(array){
    let counts = {};
    let compare = 0;
    let mostFrequent;

    for(let i = 0, len = array.length; i < len; i++){
        let item = array[i];

        if(counts[item] === undefined){
            counts[item] = 1;
        }else{
            counts[item] = counts[item] + 1;
        }
        if(counts[item] > compare){
            compare = counts[item];
            mostFrequent = array[i];
        }
    }

    return mostFrequent;
}

function getTempScale(){
    let scale = localGet('tempScale');
    return scale ? scale : 'f';
}

function clearWeather(){
    localRemove('forecast');
    localRemove('forecast_ts');
    localRemove('weather');
    localRemove('weather_ts');
}

function clearApp(){
    localRemove('forecast');
    localRemove('forecast_ts');
    localRemove('weather');
    localRemove('weather_ts');
    localRemove('zipcode');
    localRemove('country');
}