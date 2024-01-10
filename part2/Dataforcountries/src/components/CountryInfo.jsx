import React from 'react';

const CountryInfo = ({ country }) => {
  const { capital } = country;

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {country.area}</p>
      <div>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        {country.flags && <img src={country.flags.png} alt={`${country.name.common} Flag`} />}
       
    </div>
    </div>
  );
};

export default CountryInfo;
