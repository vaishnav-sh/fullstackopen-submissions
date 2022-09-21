import { useEffect, useState } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('');

  const fetchPersons = async() => {
    const {data} = await axios.get("http://localhost:3001/persons")
    return setPersons(data)
  }

  useEffect(() => {
    fetchPersons();
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const newNameObj = {
      name: newName,
      number: newNumber
    };

    let nameAlreadyThere = persons && persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if(nameAlreadyThere) {
      if (window.confirm(`${newName} already added to the phonebook, replace the old number with a new one?`)) {
        const id = persons.find(person => person.name.toLowerCase() === newName.toLowerCase()).id;
        axios.put(`http://localhost:3001/persons/${id}`, newNameObj)
        .then(response => {
          fetchPersons()
          setNewNumber("")
          setNewName("");
        })
        .catch(e => `Something went wrong: ${e.message}`)
      }
    } else {
      axios
        .post("http://localhost:3001/persons", newNameObj)
        .then((response) => {
          fetchPersons();
          setNewName("");
          setNewNumber("");
        })
        .catch((e) => console.log(`${e.message}: something went wrong`));
    }
  }

  const filteredPersons = newFilter ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())) : persons;

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }
  
  const handleDelete = (event) => {
    const deletePersonName = event.target.parentElement.innerText.split(" ")[0];
    if(window.confirm(`Delete ${deletePersonName}'s Contact`)) {
      const id = persons.find(person => person.name.startsWith(deletePersonName)).id;
      axios.delete(`http://localhost:3001/persons/${id}`)
      .then(response => fetchPersons())
      .catch(e => console.log(`Something went wrong: ${e.message}`))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilter} text="filter shown with" />
      <h2>add new</h2>
      <PersonForm onSubmit={addPerson} newName={newName} nameChange={handleNameChange} newNumber={newNumber} numChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} personDelete={handleDelete}/>
    </div>
  )
}

export default App