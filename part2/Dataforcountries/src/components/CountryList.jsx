import React from 'react';

const CountryList = ({ country, onShowDetails }) => (
  <li>
    {country.name.common}{' '}
    <button onClick={() => onShowDetails(country)}>show</button>
  </li>
);

export default CountryList;
