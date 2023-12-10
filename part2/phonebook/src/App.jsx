import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const newNameOnChange = (e) => setNewName(e.target.value)
  const newNumberOnChange = (e) => setnewNumber(e.target.value)
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
      <h2>Phonebook</h2>
      <form onSubmit={formOnSubmit}>
        <div>
          name: <input value={newName} onChange={newNameOnChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={newNumberOnChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(x => <p key={x.name}>{x.name} {x.number}</p>)}
    </div>
  )
}

export default App
