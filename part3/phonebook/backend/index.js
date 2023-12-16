const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
morgan.token('body', (req, _) => JSON.stringify(req.body))
const logger = morgan((tokens, req, res) => 
  [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res)
  ].join(' ')
)
app.use(logger)

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

app.delete('/api/persons/:id', (req, resp) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  console.log(persons)
  resp.status(204).end()
})

app.post('/api/persons/', (req, resp) => {
  const person = req.body
  person.id = Math.random() * 2**64
  while (persons.some(p => p.id === person.id)) {
    id = Math.random() * 2**64
  }
  if (!person.name) {
    resp.status(400).json({
      error: 'name must not be empty'
    })
  } else if (!person.number) {
    resp.status(400).json({
      error: 'number must not be empty'
    })
  } else if (persons.some(p => p.name === person.name)) {
    resp.status(400).json({
      error: 'name must be unique'
    })
  } else {
    persons = persons.concat(person)
    resp.send(person)
  }
})

app.get('/info', (_, resp) => {
  resp.send(`<p>Phonebook has info for ${persons.length} people</p><p>${Date().toString()}</p>`)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
