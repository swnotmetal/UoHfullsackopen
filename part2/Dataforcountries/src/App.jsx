import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryInfo from './components/CountryInfo';
import CountryList from './components/CountryList';
import Weather from './components/Weather'

const App = () => {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState(null)
  const [weatherData, setWeatherData] = useState([])
 

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then((res) => {
      setData(res.data);
    });
  }, []);

  const findCountries = (event) => {
    event.preventDefault();
    const filteredResult = data.filter((country) =>
      country.name.common.toLowerCase().includes(newData.toLowerCase())
    );
    setSearchResults(filteredResult);
    setNewData('');
    setSelectedCountries (null)
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setNewData(inputValue);
    setSelectedCountries(null)
  };
  const handleShowDetail = (country) => {
    setSelectedCountries(country)
  }

  return (
    <div>
      <form onSubmit={findCountries}>
        find countries
        <input value={newData} onChange={handleInputChange} /> 
      </form>

      {searchResults.length > 10 ? (
        <p>Too many matches, pleas specify another filter</p>
      ) : (
        <ul>
          {searchResults.map((country) => (
            <CountryList 
            key={country.name.common}
            country={country}
            onShowDetails={handleShowDetail}
            />
          ))}
        </ul>
      )}
       {selectedCountries && (
        <div>
          <CountryInfo country={selectedCountries} />
          <Weather weatherData={weatherData} capital={selectedCountries.capital[0]} />
        </div>
      )}
    </div>
  )
}

export default App


