import { useState, useEffect } from "react"
import axios from "axios"
import Countries from "./components/Countries"
import Country from "./components/Country"

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
      {filteredResults.length >= 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredResults.length === 1 ? (
        <Country data={filteredResults[0]} />
      ) : (
        <Countries countries={filteredResults} handleShow={handleShow} />
      )}
    </div>
  );
}

export default App


