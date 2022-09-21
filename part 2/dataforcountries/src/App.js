import { useState, useEffect } from "react"
import axios from "axios"
import Country from "./components/Country"
import Weather from "./components/Weather"

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState('');

  const filteredResults = newSearch ? countries.filter(country => country.name.common.toLowerCase().startsWith(newSearch.toLowerCase())) : [];

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleNewSearch = (event) => {
    setNewSearch(event.target.value);
  }

  const handleShow = (event) => {
    let country = event.target.previousSibling.innerText.toLowerCase();
    setNewSearch(country)
  }

  return (
    <div>
      find countries <input value={newSearch} onChange={handleNewSearch} />
      {filteredResults.length >= 10 ? <p>Too many matches, specify another filter</p> :
        filteredResults.length === 1 ? filteredResults.map(result => {
          return (
            <div key={result.name.common}>
              <Country name={result.name.common} capital={result.capital[0]} area={result.area} languages={result.languages} flag={result.flags.png} />
              <Weather city={result.capital[0]} />
            </div>
          );
        }) : filteredResults.map(result => {
          return (
            <div key={result.name.common}>
              <span>{result.name.common}</span>
              <button onClick={handleShow}>show</button>
            </div>
          )
        })}
    </div>
  )
}

export default App


