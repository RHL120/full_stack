import { useState, useEffect } from 'react'
import axios from 'axios'

const URL = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const matchInsensitive = (str, ...matchers) => matchers.some(matcher => matcher.toLowerCase().includes(str.toLowerCase()))

const CountrySearch = ({val, onChange}) =>
  <>
    {"find countries: "}
    <input value={val} onChange={onChange} />
  </>

const CountryList = ({countries, onChoice}) => countries.map(({name}) =>
	<div key={name.official} className="country-item">
	  <p>{name.common}</p>
    <button onClick={() => onChoice(name.official)}>show/hide</button>
	</div>
)
const CountryFlag = ({flag}) => <p style={{fontSize: "10em", marginTop: 0}}>{flag}</p>
const DisplayCountry = ({country}) =>
  <>
    <h1>{country.name.common}</h1>
    <p>capital {country.capital[0]}</p>
    <p>area {country.area}</p>
    <h3>languages:</h3>
    <ul>
      {Object.values(country.languages).map(x => <li key={x}>{x}</li>)}
    </ul>
    <CountryFlag flag={country.flag} />
  </>

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [matches, setMatches] = useState([])
  const onFilterUpdate = (e) => {
    setFilter(e.target.value)
    setMatches(countries.filter(country => matchInsensitive(e.target.value, country.name.common, country.name.official)))
  }
  const onCountryChoice = (name) => {
    setFilter(name)
    setMatches(countries.filter(country => matchInsensitive(name, country.name.common, country.name.official)))
  }
  useEffect(() => {
    axios.get(URL)
      .then(resp => setCountries(resp.data))
  }, [])
  return (
	  <>
      <CountrySearch val={filter} onChange={onFilterUpdate} />
      {
        matches.length <= 10?
        (
          matches.length == 1?
          <DisplayCountry country={matches[0]} /> :
          <CountryList countries={matches} onChoice={onCountryChoice}/>
        ) :
        <p>Too many matches, specify another filter</p>
      }
    </>
  )
}

export default App
