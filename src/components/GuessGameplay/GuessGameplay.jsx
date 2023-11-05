import cn from 'classnames'
import { useState } from 'react'
import { ReactComponent as ImagePlaceHolder } from '../../assets/icons/picture.svg'
import Answers from '../Answers/Answers'
import Button from '../UI/Buttons/Button'
import styles from './GuessGameplay.module.css'

const GuessGameplay = ({
  isBlurred,
  gameData,
  totalQuestions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  setCorrectCounter,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const questionData = gameData.questions[currentQuestionIndex]

  const selectAnswerHandler = e => {
    e.preventDefault()
    setErrorMessage(null)
    e.currentTarget.name === selectedAnswer
      ? setSelectedAnswer(null)
      : setSelectedAnswer(e.currentTarget.name)
  }

  const submitAnswerHandler = () => {
    if (selectedAnswer === null) {
      setErrorMessage('Выберите вариант ответа')
      return
    }
    if (questionData.correctAnswer === selectedAnswer) {
      setCorrectCounter(prev => prev + 1)
    }
    setSelectedAnswer(null)
    setCurrentQuestionIndex(prev => prev + 1)
  }

  return (
    <>
      <main className={cn(styles.guessGameplay, isBlurred && styles.blurred)}>
        <div className={styles.totalQuestions}>{`${
          currentQuestionIndex + 1
        }/${totalQuestions}`}</div>

        <h1 className={styles.questionTitle}>{questionData.questionTitle}</h1>
        <div className={styles.guessImageWrapper}>
          {questionData.imageUrl ? (
            <>
              <img
                className={styles.guessPicture}
                src={questionData.imageUrl}
                alt={questionData.questionTitle}
              />
            </>
          ) : (
            <ImagePlaceHolder className={styles.guessPicture} />
          )}
        </div>

        <div className={styles.actions}>
          <div className={cn(styles.error, errorMessage && styles.errorActive)}>{errorMessage}</div>
          <Button
            text="Ответить"
            onClick={submitAnswerHandler}
            size="small"
            bgcolor="green"
            customStyle="margin-left"
          />
        </div>

        <Answers
          gameplay={true}
          selectAnswerHandler={selectAnswerHandler}
          questionData={questionData}
          selectedAnswer={selectedAnswer}
        />
      </main>
    </>
  )
}

export default GuessGameplay
