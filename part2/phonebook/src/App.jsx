import { useEffect, useState } from 'react'
import phonebookService from './services/phonebook'


const Filter = ({filter, onChange}) =>
  <>
    filter shown with: <input value={filter} onChange={onChange} name='filter'/>
  </>
const PersonForm = ({onSubmit, newName, onChangeNewName, newNumber, onChangeNewNumber}) =>
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName} onChange={onChangeNewName} name='fullname'/>
    </div>
    <div>
      number: <input value={newNumber} onChange={onChangeNewNumber} name='number'/>
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
const Person = ({person, persons, setPersons}) => {
  const onClick = () => {
    if (confirm(`Delete ${person.name} ?`)) {
      phonebookService.deleteContact(person.id)
       .then(() => setPersons(persons.filter(p => p.id !== person.id)))
    }
  }
  return (
    <p key={person.name}>
      {person.name} {person.number}
      <button onClick={onClick}>{"delete"}</button>
    </p>
  )
}
const Persons = ({persons, filter, setPersons}) => {
        return persons
          .filter(({name}) => name.toLowerCase().includes(filter.toLowerCase()))
          .map(person => <Person key={person.name} person={person} persons={persons} setPersons={setPersons}/>)}
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  useEffect(() => {
    phonebookService.getAll()
      .then((resp) => setPersons(resp))
  }, [])
  const onChange = (setter) => (e) => setter(e.target.value)
  const formOnSubmit = (e) => {
    e.preventDefault()
    let pidx = persons.findIndex(p => p.name == newName)
    if (pidx >= 0) {
      let replace = confirm(`${persons[pidx].name} is already added to the phonebook, replace the old number with a new one?`);
      if (replace) {
        const newPerson = {...persons[pidx], number: newNumber};
        phonebookService.update(persons[pidx].id, newPerson)
          .then(() => {
            let newPersons = [...persons]
            newPersons[pidx] = newPerson
            setPersons(newPersons)
          })
        setNewNumber('')
        setNewName('')
      }
    } else {
      let newPerson = {name: newName, number: newNumber}
      setNewNumber('')
      setNewName('')
      phonebookService.newContact(newPerson).then(() => setPersons(persons.concat(newPerson)))
    }
  }
  return (
    <div>
      <Filter filter={filter} onChange={onChange(setFilter)} />
      <h2>Phonebook</h2>
      <h2>Numbers</h2>
      <PersonForm onSubmit={formOnSubmit} newName={newName} onChangeNewName={onChange(setNewName)}
        newNumber={newNumber} onChangeNewNumber={onChange(setNewNumber)} />
      <Persons persons={persons} filter={filter} setPersons={setPersons}/>
    </div>
  )
}

export default App
