import { useState } from 'react'

const StatisticLine = ({name, num}) =>
  <tr>
    <td>{name}</td>
    <td>{num}</td>
  </tr>
const Button = ({onClick, name}) => <button onClick={onClick}>{name}</button>

const Statistics = ({good, neutral, bad}) =>  {
  const total = good + neutral + bad;
  const average = (good - bad) / total
  const positive = (good) / total * 100
  if (total !== 0) {
    return (
      <table>
        <tbody>
          <StatisticLine name={"good"} num={good} />
          <StatisticLine name={"neutral"} num={neutral} />
          <StatisticLine name={"bad"} num={bad} />
          <StatisticLine name={"all"} num={total} />
          <StatisticLine name={"average"} num={average} />
          <StatisticLine name={"positive"} num={`${positive} %`} />
        </tbody>
      </table>
    )
  } else {
    return <p>No feedback is given</p>
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} name={"good"}/>
      <Button onClick={() => setNeutral(neutral + 1)} name={"neutral"}/>
      <Button onClick={() => setBad(bad + 1)} name={"bad"}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
