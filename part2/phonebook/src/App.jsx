import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const newNameOnChange = (e) => setNewName(e.target.value)
  const formOnSubmit = (e) => {
    e.preventDefault()
    if (persons.some(x => x.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat({name: newName}))
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(x => <p key={x.name}>{x.name}</p>)}
    </div>
  )
}

export default App
