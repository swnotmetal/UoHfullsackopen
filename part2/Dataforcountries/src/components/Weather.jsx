import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = ({ capital }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_API_KEY;

    if (capital) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}`)
        .then((res) => {
          console.log(`The capital of the country found: ${capital}`);
          setWeatherData(res.data);
        })
        .catch((error) => {
          console.error('API fetching failed:', error);
        });
    }
  }, [capital]);

  return (
    <div>
      <h3>Weather in {capital}</h3>
      {weatherData && (
        <div>
          <p>{`Temperature: ${(weatherData.main?.temp - 273.15).toFixed(2)}°C`}</p>
          {weatherData.weather && weatherData.weather.length > 0 && (
            <>
              <img
                alt="weather icon"
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`}
              />
              <p>{`Wind: ${weatherData.wind?.speed} m/s`}</p>
            </>
          )}
        </div>
      )}
      {!weatherData && <p>Loading weather data...</p>}
    </div>
  );
};

export default Weather;


