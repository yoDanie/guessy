import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import GuessGameplay from '../../components/GuessGameplay/GuessGameplay'
import { supabase } from '../../supabaseClient'
import { useParams, useNavigate } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import GameOver from '../../components/GuessGameplay/GameOver'
import Nav from '../../components/Nav/Nav'
import ModalRegistration from '../../components/ModalRegistration'
import ModalSignIn from '../../components/ModalSignIn'

const GameplayPage = () => {
  const [modalSignInActive, setModalSignInActive] = useState(false)
  const [modalRegistration, setModalRegistration] = useState(false)
  const [gameData, setGameData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [correctCounter, setCorrectCounter] = useState(0)

  const totalQuestions = gameData && gameData.questions.length
  const isGameOver = currentQuestionIndex === totalQuestions
  const isGameWon = totalQuestions === correctCounter
  const isBlurred = modalSignInActive || modalRegistration
  const { gameId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchGameData()
  }, [])

  const fetchGameData = async () => {
    setIsLoading(true)
    try {
      const { error, data } = await supabase
        .from('games')
        .select()
        .eq('id', gameId)
        .limit(1)
        .single()
      if (error) {
        return navigate('/404')
      }
      setGameData(data)
    } catch (error) {
      console.log(`Ошибочка... ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const signInHandler = () => setModalSignInActive(true)
  const registrationHandler = () => setModalRegistration(true)

  return (
    <>
      {isLoading && <Loader />}

      <ModalSignIn
        modalSignInActive={modalSignInActive}
        setModalSignInActive={setModalSignInActive}
      />
      <ModalRegistration
        modalRegistration={modalRegistration}
        setModalRegistration={setModalRegistration}
      />

      {gameData && (
        <>
          <Header pageTitle={gameData.gameTitle}>
            <Nav
              currentPage="gameplay"
              signInHandler={signInHandler}
              registrationHandler={registrationHandler}
            />
          </Header>
          {!isGameOver && (
            <GuessGameplay
              isBlurred={isBlurred}
              gameData={gameData}
              totalQuestions={totalQuestions}
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              setCorrectCounter={setCorrectCounter}
            />
          )}
          {isGameOver && (
            <GameOver
              isBlurred={isBlurred}
              isGameWon={isGameWon}
              totalQuestions={totalQuestions}
              correctCounter={correctCounter}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              setCorrectCounter={setCorrectCounter}
            />
          )}
        </>
      )}
    </>
  )
}

export default GameplayPage
