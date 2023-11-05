import cn from 'classnames'
import styles from './Answers.module.css'
import { ReactComponent as CheckMark } from './checkMark.svg'
import { ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D, ANSWERS_INPUT_PLACEHOLDER } from '../../constants'

const Answers = ({
  gameplay,
  creation,
  handleAnswerInput,
  selectAnswerHandler,
  answersData,
  selectedAnswer,
  questionData,
}) => {
  const selectionClassName = selectOption =>
    selectedAnswer === selectOption
      ? `${styles.selectedAnswer} ${styles.checkMark}`
      : styles.checkMark

  return (
    <>
      {creation && (
        <div className={styles.guessAnswers}>
          <div className={cn(styles.answer, styles[ANSWER_A])}>
            <div className={styles.answerLabel}>a</div>
            <input
              name={ANSWER_A}
              value={answersData.answerA}
              onChange={handleAnswerInput}
              className={styles.answerInput}
              type="text"
              placeholder={ANSWERS_INPUT_PLACEHOLDER}
            />
            <button
              name={ANSWER_A}
              className={styles.answerButton}
              type="button"
              onClick={selectAnswerHandler}
            >
              <CheckMark className={selectionClassName(ANSWER_A)} />
            </button>
          </div>

          <div className={cn(styles.answer, styles[ANSWER_B])}>
            <div className={styles.answerLabel}>b</div>
            <input
              name={ANSWER_B}
              value={answersData.answerB}
              className={styles.answerInput}
              onChange={handleAnswerInput}
              type="text"
              placeholder={ANSWERS_INPUT_PLACEHOLDER}
            />
            <button
              name={ANSWER_B}
              className={styles.answerButton}
              type="button"
              onClick={selectAnswerHandler}
            >
              <CheckMark className={selectionClassName(ANSWER_B)} />
            </button>
          </div>

          <div className={cn(styles.answer, styles[ANSWER_C])}>
            <div className={styles.answerLabel}>c</div>
            <input
              name={ANSWER_C}
              value={answersData.answerC}
              className={styles.answerInput}
              onChange={handleAnswerInput}
              type="text"
              placeholder={ANSWERS_INPUT_PLACEHOLDER}
            />
            <button
              name={ANSWER_C}
              className={styles.answerButton}
              type="button"
              onClick={selectAnswerHandler}
            >
              <CheckMark className={selectionClassName(ANSWER_C)} />
            </button>
          </div>

          <div className={cn(styles.answer, styles[ANSWER_D])}>
            <div className={styles.answerLabel}>d</div>
            <input
              name={ANSWER_D}
              value={answersData.answerD}
              className={styles.answerInput}
              onChange={handleAnswerInput}
              type="text"
              placeholder={ANSWERS_INPUT_PLACEHOLDER}
            />
            <button
              name={ANSWER_D}
              className={styles.answerButton}
              type="button"
              onClick={selectAnswerHandler}
            >
              <CheckMark className={selectionClassName(ANSWER_D)} />
            </button>
          </div>
        </div>
      )}

      {gameplay && (
        <div className={styles.guessAnswers}>
          <div className={cn(styles.answer, styles[ANSWER_A])}>
            <div className={styles.answerLabel}>a</div>
            <div className={styles.answerOption}>{questionData.answersData[ANSWER_A]}</div>
            <button
              name={ANSWER_A}
              className={styles.answerButton}
              type="button"
              onClick={selectAnswerHandler}
            >
              <CheckMark className={selectionClassName(ANSWER_A)} />
            </button>
          </div>

          <div className={cn(styles.answer, styles[ANSWER_B])}>
            <div className={styles.answerLabel}>b</div>
            <div className={styles.answerOption}>{questionData.answersData[ANSWER_B]}</div>
            <button
              name={ANSWER_B}
              className={styles.answerButton}
              type="button"
              onClick={selectAnswerHandler}
            >
              <CheckMark className={selectionClassName(ANSWER_B)} />
            </button>
          </div>

          <div className={cn(styles.answer, styles[ANSWER_C])}>
            <div className={styles.answerLabel}>c</div>
            <div className={styles.answerOption}>{questionData.answersData[ANSWER_C]}</div>
            <button
              name={ANSWER_C}
              className={styles.answerButton}
              type="button"
              onClick={selectAnswerHandler}
            >
              <CheckMark className={selectionClassName(ANSWER_C)} />
            </button>
          </div>

          <div className={cn(styles.answer, styles[ANSWER_D])}>
            <div className={styles.answerLabel}>d</div>
            <div className={styles.answerOption}>{questionData.answersData[ANSWER_D]}</div>
            <button
              name={ANSWER_D}
              className={styles.answerButton}
              type="button"
              onClick={selectAnswerHandler}
            >
              <CheckMark className={selectionClassName(ANSWER_D)} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Answers
