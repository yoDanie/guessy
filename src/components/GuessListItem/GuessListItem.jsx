import { useState } from 'react'
import { supabase } from '../../supabaseClient'
import { getDeclension } from '../../utils/getWordDeclension'
import Button from '../UI/Buttons/Button'
import Modal from '../UI/Modal/Modal'
import CopyAction from './CopyAction'
import DeleteAction from './DeleteAction'
import EditAction from './EditAction'
import styles from './GuessListItem.module.css'
import PlayAction from './PlayAction'
import ShareAction from './ShareAction'

const GuessListItem = ({
  id,
  title,
  totalQuestions,
  profileData,
  setProfileData,
  setIsLoading,
}) => {
  const [modalDeleteGameActive, setModalDeleteGameActive] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const deleteGameHandler = async () => {
    setIsLoading(true)
    const gameImages = profileData
      .find(g => g.id === id)
      .questions.reduce((acc, question) => {
        if (question.imageName !== null) {
          acc.push(question.imageName)
        }
        return acc
      }, [])

    try {
      if (gameImages.length > 0) {
        await supabase.storage.from('images').remove(gameImages)
      }
      await supabase.from('games').delete().match({ id: id })
      setProfileData([...profileData].filter(game => game.id !== id))
      setSuccessMessage('Игра успешно удалена!')
    } catch (error) {
      setErrorMessage(`${error}`)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteModalHandler = () => setModalDeleteGameActive(prev => !prev)

  return (
    <>
      {modalDeleteGameActive && (
        <Modal
          title="Вы уверены, что хотите удалить квиз?"
          modalActive={modalDeleteGameActive}
          setModalActive={setModalDeleteGameActive}
          errorMessage={errorMessage}
          successMessage={successMessage}
        >
          <div className={styles.modalButtons}>
            <Button onClick={deleteGameHandler} text="Удалить" size="small" />
            <Button onClick={deleteModalHandler} text="Отмена" size="small" />
          </div>
        </Modal>
      )}

      <div className={styles.guessListItem}>
        <div className={styles.guessTitle}>{title}</div>
        <div className={styles.info}>
          <div className="questionsCount">
            <span className={styles.counter}>{totalQuestions}</span>{' '}
            {getDeclension('вопрос', 'вопроса', 'вопросов')(totalQuestions)}
          </div>
          <div className={styles.actions}>
            <PlayAction id={id} />
            <CopyAction id={id} />
            <ShareAction id={id} />
            <EditAction id={id} />
            <DeleteAction deleteModalHandler={deleteModalHandler} />
          </div>
        </div>
      </div>
    </>
  )
}

export default GuessListItem
