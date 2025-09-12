import { useState, useEffect} from 'react'
import LoadQuestions from './components/LoadQuestions.jsx'
import './App.css'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizData, setQuizData] = useState([])
  const [loading, setLoading] = useState(false)

  function handleShuffle(array) {
    return array.sort(() => Math.random() - 0.5)
  }
  useEffect(() =>{
    if (!quizStarted){
      return
    }
    async function  getApiData()  {
      try {
        setLoading(true)
        const response = await fetch('https://opentdb.com/api.php?amount=5')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        const shuffledData = data.results.map((question, index) => ({
          ...question,
          id: index,
          allAnswers: handleShuffle([...question.incorrect_answers, question.correct_answer]),
        }))
        console.log(shuffledData)
        setQuizData(shuffledData)
      } catch (error) {
        console.error('There has been a problem with the fetch operation:', error)
      }
      finally {
        setLoading(false)
      }
    } getApiData()
  }, [quizStarted])
  
  function handleClick() {
      setQuizStarted(true)
      setGameStarted(true)
    }
  
  function playAgain() {
      setQuizStarted(false)
      setGameStarted(false)
      setQuizData([])
  }

  return (
    <>
      {gameStarted ? (
      <section className="quiz-container">
        {quizStarted  && <LoadQuestions quizData={quizData} onplayAgain={playAgain}/>}
      </section>):( <div className="landing-page">
        <h1>Quizzical</h1> 
        <p>Welcome to the Quizzical app!</p>
        <button onClick={handleClick} disabled={loading} className="start-button">Start Quiz</button>
      </div>)  }
    </>
  )
}

export default App