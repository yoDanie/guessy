import Button from '../UI/Buttons/Button'
import MyLink from '../UI/Buttons/MyLink'
import styles from './GameOver.module.css'
import { getDeclension } from '../../utils/getWordDeclension'
import cn from 'classnames'

const GameOver = ({
  isBlurred,
  isGameWon,
  correctCounter,
  setCurrentQuestionIndex,
  setCorrectCounter,
  totalQuestions,
}) => {
  const playAgainHandler = () => {
    setCorrectCounter(0)
    setCurrentQuestionIndex(0)
  }

  return (
    <>
      <main className={cn(styles.gameover, isBlurred && styles.blurred)}>
        <div className={styles.star}>
          {isGameWon ? (
            <span className={styles.super}>Супер!</span>
          ) : (
            <span className={styles.super}>Неплохо!</span>
          )}
        </div>
        <div className={styles.text}>
          {isGameWon
            ? 'Вы ответили правильно на все вопросы!'
            : `Вы ответили правильно на ${correctCounter} ${getDeclension(
                'вопрос',
                'вопроса',
                'вопросов'
              )(correctCounter)} из ${totalQuestions}`}
        </div>
        <nav className={styles.nav}>
          <Button
            onClick={playAgainHandler}
            bgcolor="violet"
            size="medium"
            text="Сыграть заново"
            customStyle="spacing"
          />
          <MyLink to="/" bgcolor="violet" size="medium" text="На главную" customStyle="spacing" />
        </nav>
      </main>
    </>
  )
}

export default GameOver
