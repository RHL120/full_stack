const express = require('express')

const app = express()
app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (_, resp) => {
  resp.json(persons)
})

app.get('/api/persons/:id', (req, resp) => {
  const id = Number(req.params.id)
  let person = persons.find(p => p.id === id)
  if (person) {
    resp.json(person)
  } else {
    resp.status(404).end()
  }
})

app.get('/info', (req, resp) => {
  resp.send(`<p>Phonebook has info for ${persons.length} people</p><p>${Date().toString()}</p>`)
})

app.listen(3001)
