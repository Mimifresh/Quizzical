import he from 'he'
import { useState } from 'react'

export default function LoadQuestions(props){
    const [selectedanswers, setSelectedAnswers] = useState({})
    const [checkAnswerbtn, setCheckAnswerbtn] = useState(false)
    const [showAnswers, setShowAnswers] = useState(false)
    const [score, setScore] = useState(0)

    function handleAnswerClick(answer, questionIndex) {
        setSelectedAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionIndex]: answer
        }))
        setCheckAnswerbtn(true)
    }

    function handleCheckAnswers() {
        let newScore = 0
        props.quizData.forEach((question, index) => {
            if (selectedanswers[index] === question.correct_answer) {
                newScore += 1
            }
        })
        setScore(newScore)
        setShowAnswers(true)
        console.log('checking answers')
        console.log('Score:', newScore)
    }


    const questionArray = props.quizData.map((question, index) => {
        return (
            <div key={index} className="question-card">
                <h2>{index + 1}. {he.decode(question.question)}</h2>
                <ul>
                    {question.allAnswers.map((answer, i) => {
                        const decodedAnswer = he.decode(answer)
                        const isSelected = selectedanswers[index] === decodedAnswer
                        let className= ''
                        if (showAnswers) {
                            if(decodedAnswer === question.correct_answer){
                                className = 'correct-answer'
                            }else if (isSelected) {
                                className = 'incorrect-answer'
                            }
                        }
                        return(
                        <li
                        key={i}
                        className={className}
                        onClick={() =>!showAnswers && handleAnswerClick(decodedAnswer, index)}
                        style={!showAnswers && isSelected ? { backgroundColor: '#D6DBF5'} : undefined}>
                            {(decodedAnswer)}
                            </li>)
                    })}

                </ul>
            </div>
        )
    })



    return (
        <>
            <div className="questions-container">
                {questionArray}
            </div>
            {checkAnswerbtn && <section className='check-answers'>
               { showAnswers ? 
                    <div className="Result">
                        <p>You scored {score}/{props.quizData.length} correct answers</p>
                        <button onClick={props.onplayAgain}>Play again</button>
                    </div> :
                    <button onClick={handleCheckAnswers} className="check-answers-button">Check Answers</button>
                }
            </section>}
        </>
    )
}