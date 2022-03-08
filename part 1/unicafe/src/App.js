import { useState } from "react"

const Button = ({ onClick, name }) => <button onClick={onClick}>{name}</button>

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && bad === 0 && neutral === 0) {
    return <p>No feedback given</p>;
  }

  let all = good + bad + neutral;
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <StatisticLine name="good" value={good} />
        <StatisticLine name="neutral" value={neutral} />
        <StatisticLine name="bad" value={bad} />
        <StatisticLine name="all" value={all} />
        <StatisticLine name="average" value={(good - bad) / all} />
        <StatisticLine name="percentage" value={(good / all) * 100} />
      </table>
    </div>
  )
}

const StatisticLine = ({ name, value }) => {
  if (name === "percentage") {
    return (
      <tr>
        <td colSpan={5}>{name}</td>
        <td colSpan={5}>{value} %</td>
      </tr>
    )
  }
  return (
    <tr>
      <td colSpan={5}>{name}</td>
      <td colSpan={5}>{value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => {
    setGood(good + 1);
  }

  const increaseNeutral = () => {
    setNeutral(neutral + 1);
  }

  const increaseBad = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={increaseGood} name="good" />
      <Button onClick={increaseNeutral} name="neutral" />
      <Button onClick={increaseBad} name="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;