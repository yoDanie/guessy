import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GuessCreation from '../../components/GuessCreation/GuessCreation'
import Header from '../../components/Header/Header'
import ModalEditGuess from '../../components/ModalEditGuess'
import Nav from '../../components/Nav/Nav'
import QuestionsList from '../../components/QuestionsList/QuestionsList'
import Button from '../../components/UI/Buttons/Button'
import Loader from '../../components/UI/Loader/Loader'
import { EDIT_GUESS_SUBMIT, SUPABASE_IMAGES_STORAGE_URL } from '../../constants'
import { supabase } from '../../supabaseClient'
import styles from './EditGuessPage.module.css'

const EditGuessPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [initLoadCompleted, setInitLoadCompleted] = useState(false)
  const [gameTitle, setGameTitle] = useState('')
  const [initialData, setInitialData] = useState(null)

  const [savedQuestions, setSavedQuestions] = useState([])
  const [indexOfDeletedQuestion, setIndexOfDeletedQuestion] = useState(null)
  const [modalEditGuessActive, setModalEditGuessActive] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const { gameId } = useParams()

  useEffect(() => {
    fetchGameData()
  }, [])

  const fetchGameData = async () => {
    setIsLoading(true)
    try {
      const { data } = await supabase.from('games').select().eq('id', gameId).limit(1).single()
      setGameTitle(data.gameTitle)
      setSavedQuestions(data.questions)
      setInitialData(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      setInitLoadCompleted(true)
    }
  }

  const editGuessHandler = async e => {
    e.preventDefault()
    const trimmedTitle = gameTitle.trim()
    if (trimmedTitle.length === 0) {
      setErrorMessage('Введите название')
      setGameTitle(trimmedTitle)
      return
    }
    if (savedQuestions.length === 0) {
      setErrorMessage('Вы должны создать хотя бы один вопрос')
      return
    }

    const questionsData = savedQuestions.reduce((acc, question) => {
      const result = {
        id: question.id,
        answersData: question.answersData,
        correctAnswer: question.correctAnswer,
        questionTitle: question.questionTitle,
        imageUrl:
          question.imageUrl ||
          (question.imageName && `${SUPABASE_IMAGES_STORAGE_URL}/${question.imageName}`),
        imageName: question.imageName,
      }
      acc.push(result)
      return acc
    }, [])
    const gameData = {
      gameTitle: trimmedTitle,
      questions: questionsData,
      userId: initialData.userId,
    }

    setIsLoading(true)
    try {
      // Delete старых неиспользуемых:
      const newImages = savedQuestions.map(q => q.imageName)
      const imagesToDelete = initialData.questions.reduce((acc, question) => {
        if (!newImages.includes(question.imageName)) {
          acc.push(question.imageName)
        }
        return acc
      }, [])
      if (imagesToDelete.length > 0) {
        await supabase.storage.from('images').remove(imagesToDelete)
      }
      // Аплоад новых картинок
      for (const question of savedQuestions) {
        if (question.imageName && !question.imageUrl) {
          const imgName = question.imageName
          const image64 = await fetch(question.imagePreview)
          const blob = await image64.blob()
          const imageFile = new File([blob], imgName, { type: 'image' })
          await supabase.storage.from('images').upload(imgName, imageFile)
        }
      }

      // Перезапись таблицы
      await supabase.from('games').update(gameData).match({ id: gameId })
      setSuccessMessage('Игра успешно отредактирована!')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const modalEditGuessHandler = () => {
    setModalEditGuessActive(true)
    setErrorMessage(null)
    setSuccessMessage(null)
  }

  return (
    <>
      {isLoading && <Loader />}

      <ModalEditGuess
        modalEditGuessActive={modalEditGuessActive}
        setModalEditGuessActive={setModalEditGuessActive}
        gameTitle={gameTitle}
        setGameTitle={setGameTitle}
        editGuessHandler={editGuessHandler}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        successMessage={successMessage}
      />

      <Header pageTitle="Редактирование квиза">
        <Nav currentPage="edit-guess">
          <Button
            onClick={modalEditGuessHandler}
            text={EDIT_GUESS_SUBMIT}
            size="small"
            customStyle="spacing"
            bgcolor="pink"
            type="button"
          />
        </Nav>
      </Header>
      <main className={cn(styles.main, modalEditGuessActive && styles.blurred)}>
        <QuestionsList
          gameId={gameId}
          savedQuestions={savedQuestions}
          setSavedQuestions={setSavedQuestions}
          setIndexOfDeletedQuestion={setIndexOfDeletedQuestion}
        />
        <GuessCreation
          gameId={gameId}
          initLoadCompleted={initLoadCompleted}
          savedQuestions={savedQuestions}
          setSavedQuestions={setSavedQuestions}
          indexOfDeletedQuestion={indexOfDeletedQuestion}
        />
      </main>
    </>
  )
}

export default EditGuessPage
