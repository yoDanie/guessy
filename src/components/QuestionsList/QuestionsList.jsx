import cn from 'classnames'
import { NavLink } from 'react-router-dom'
import QuestionsListItem from '../QuestionsListItem/QuestionsListItem'
import styles from './QuestionsList.module.css'
import btnStyles from '../../components/UI/Buttons/AddNew.module.css'
import { useState } from 'react'

const QuestionsList = ({
  gameId,
  savedQuestions,
  setSavedQuestions,
  setIndexOfDeletedQuestion,
}) => {
  const [currentDragIndex, setCurrentDragIndex] = useState(null)

  return (
    <>
      <section className={styles.questionsList}>
        {savedQuestions.length > 0 ? (
          savedQuestions.map((question, index) => (
            <QuestionsListItem
              index={index}
              currentDragIndex={currentDragIndex}
              setCurrentDragIndex={setCurrentDragIndex}
              gameId={gameId}
              key={question.id}
              id={question.id}
              title={question.questionTitle}
              image={question.imagePreview || question.imageUrl}
              savedQuestions={savedQuestions}
              setSavedQuestions={setSavedQuestions}
              setIndexOfDeletedQuestion={setIndexOfDeletedQuestion}
            />
          ))
        ) : (
          <div className={styles.info}>Список вопросов пуст</div>
        )}

        <NavLink
          to={gameId ? `/edit-guess/${gameId}` : '/create-guess'}
          className={cn(btnStyles.addNewButton, btnStyles.QSButton)}
        ></NavLink>
      </section>
    </>
  )
}

export default QuestionsList
