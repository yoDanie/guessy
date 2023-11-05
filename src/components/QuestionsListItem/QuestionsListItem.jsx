import cn from 'classnames'
import { ReactComponent as ImagePlaceHolder } from '../../assets/icons/picture.svg'
import styles from './QuestionsListItem.module.css'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const QuestionsListItem = ({
  index,
  currentDragIndex,
  setCurrentDragIndex,
  gameId,
  id,
  title,
  image,
  savedQuestions,
  setSavedQuestions,
  setIndexOfDeletedQuestion,
}) => {
  const [draggedOver, setDraggedOver] = useState(false)

  const deleteQuestionHandler = e => {
    e.preventDefault()
    setIndexOfDeletedQuestion(savedQuestions.findIndex(q => q.id === id))
    setSavedQuestions([...savedQuestions.filter(q => q.id !== id)])
    if (!gameId) {
      localStorage.setItem(
        'savedQuestions',
        JSON.stringify([...savedQuestions.filter(question => question.id !== id)])
      )
    }
  }

  const dragStartHandler = () => {
    setCurrentDragIndex(index)
  }
  const dragLeaveHandler = () => {
    setDraggedOver(false)
  }
  const dragEndHandler = () => {
    setDraggedOver(false)
  }
  const dragOverHandler = e => {
    e.preventDefault()
    setDraggedOver(true)
  }
  const dropHandler = e => {
    e.preventDefault()
    const copy = [...savedQuestions]
    copy[index] = savedQuestions[currentDragIndex]
    copy[currentDragIndex] = savedQuestions[index]
    setSavedQuestions(copy)
    setDraggedOver(false)
  }

  return (
    <NavLink
      to={gameId ? `/edit-guess/${gameId}/question/${id}` : `/create-guess/question/${id}`}
      className={({ isActive }) =>
        cn(styles.item, isActive && styles.active, draggedOver && styles.draggedOver)
      }
      draggable={true}
      onDragStart={dragStartHandler}
      onDragLeave={dragLeaveHandler}
      onDragEnd={dragEndHandler}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
    >
      <button className={styles.deleteIcon} type="button" onClick={deleteQuestionHandler}></button>
      <div className={styles.number}>Вопрос №{index + 1}</div>
      <div className={styles.card}>
        <h4 className={styles.title}>{title}</h4>
        {image ? (
          <img className={styles.image} src={image} alt="Картинка" />
        ) : (
          <ImagePlaceHolder className={cn(styles.image, styles.placeholder)} />
        )}
      </div>
    </NavLink>
  )
}

export default QuestionsListItem
