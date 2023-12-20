import { useState } from "react"

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good,neutral,bad,all,allClicks,total,score}) => {
    const noClick = total ===0

    if (noClick) {
      return (
      <div>
      <p>No feedback given</p>
      </div>
      )
    }

    const averageScore = total === 0 ? 0 : (score / total)
    const postiveScore = total === 0 ? 0 : (good / total) * 100 + ' %'

    return (
    <table>
      <thead>
      <StatisticsLine text='good' value={good}/>
      <StatisticsLine text='neutral' value={neutral}/>
      <StatisticsLine text='bad' value={bad}/>
      <StatisticsLine text='all' value={allClicks.length}/>
      <StatisticsLine text='average' value={averageScore}/>
      <StatisticsLine text='positive' value={postiveScore}/>
      </thead>
    </table>
      )  
}



const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)
  const [score, setScore] = useState(0)

  const handleGoodClick = () => {
    setAll(allClicks.concat('good'))
    setGood(good + 1)
    setTotal(total + 1)
    setScore(score + 1)
  }
  
  const handleBadClick = () => {
    setAll(allClicks.concat('bad'))
    setBad(bad + 1)
    setTotal(total + 1)
    setScore(score - 1)
  }
  
  const handleNeutralClick = () => {
    setAll(allClicks.concat('neutral'))
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks} total={total} score={score} />
    </div>
  )
}
export default App
