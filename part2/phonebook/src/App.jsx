import { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = ({filter, onChange}) =>
  <>
    filter shown with: <input value={filter} onChange={onChange} name="filter"/>
  </>
const PersonForm = ({onSubmit, newName, onChangeNewName, newNumber, onChangeNewNumber}) =>
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName} onChange={onChangeNewName} name="fullname"/>
    </div>
    <div>
      number: <input value={newNumber} onChange={onChangeNewNumber} name="number"/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
const Person = ({person}) => <p key={person.name}>{person.name} {person.number}</p>
const Persons = ({persons, filter}) => 
        persons
          .filter(({name}) => name.toLowerCase().includes(filter.toLowerCase()))
          .map(person => <Person key={person.name} person={person} />)
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [filter, setFilter] = useState('')
  useEffect(() => {
    axios.get("http://localhost:30001/persons")
      .then((resp) => setPersons(resp.data))
  }, [])
  const onChange = (setter) => (e) => setter(e.target.value)
  const formOnSubmit = (e) => {
    e.preventDefault()
    if (persons.some(x => x.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
  }
  return (
    <div>
      <Filter filter={filter} onChange={onChange(setFilter)} />
      <h2>Phonebook</h2>
      <h2>Numbers</h2>
      <PersonForm onSubmit={formOnSubmit} newName={newName} onChangeNewName={onChange(setNewName)}
        newNumber={newNumber} onChangeNewNumber={onChange(setnewNumber)} />
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App
