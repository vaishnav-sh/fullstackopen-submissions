import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import {getAll, createPerson, updatePerson, deletePerson} from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    getAll().then(data => setPersons(data))
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
        updatePerson(id, newNameObj).then(returnedPerson => {
          setPersons(persons.map(person => (person.id !== id ? person : returnedPerson)))
          setNewName("");
          setNewNumber("");
        })
        .catch(e => `Something went wrong: ${e.message}`)
      }
    } else {
        createPerson(newNameObj).then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        })
        .catch((e) => console.log(`${e.message}: something went wrong`));
    }
  }

  const filteredPersons = newFilter ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())) : persons;

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  }
  
  const handleDelete = (id, name) => {
    if(window.confirm(`Delete ${name}'s Contact`)) {
      deletePerson(id).then(returnedPerson => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(e => console.log(`Something went wrong: ${e.message}`))
    }
  }

  return (
    <div>
      <Filter value={newFilter} onChange={handleFilter} text="filter shown with" />
      <PersonForm onSubmit={addPerson} newName={newName} nameChange={handleNameChange} newNumber={newNumber} numChange={handleNumberChange} />
      <Persons persons={filteredPersons} personDelete={handleDelete}/>
    </div>
  )
}

export default App