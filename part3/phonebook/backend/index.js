const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
const errorHandler = (error, _, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

app.get('/api/persons', (_, resp) => {
	Person.find({}).then(persons => resp.json(persons))
})

app.get('/api/persons/:id', (req, resp) => {
	Person.findById(req.params.id).then(person => {
		resp.json(person)
	})
})

app.delete('/api/persons/:id', (req, resp, next) => {
	Person.findByIdAndDelete(req.params.id)
		.then(_ => {
			resp.status(204).end()
		})
		.catch(error => next(error))

})

app.post('/api/persons/', (req, resp) => {
	const body = req.body
	if (!body.number) {
		resp.status(400).json({error: 'number is missing'})
	} else if (!body.name) {
		resp.status(400).json({error: 'body is missing'})
	} else {
		const person = new Person({
			name: body.name,
			number: body.number,
		})
		person.save().then(savedPerson => {
			resp.json(savedPerson)
		})
	}
})

app.get('/info', (_, resp) => {
	Person.find({}).then(persons => {
		if (!persons) {
			resp.status(404).end()
		}
  		resp.send(`<p>Phonebook has info for ${persons.length} people</p><p>${Date().toString()}</p>`)
	})
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
