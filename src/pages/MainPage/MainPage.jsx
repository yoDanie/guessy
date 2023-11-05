import cn from 'classnames'
import { useState } from 'react'
import ModalRegistration from '../../components/ModalRegistration'
import ModalSignIn from '../../components/ModalSignIn'
import Nav from '../../components/Nav/Nav'
import Button from '../../components/UI/Buttons/Button'
import Loader from '../../components/UI/Loader/Loader'
import { supabase } from '../../supabaseClient'
import styles from './MainPage.module.css'
import QuestionMark from './questionMark.png'
import quoteImage from './quote.png'
import { useNavigate } from 'react-router-dom'
import { UUID_LENGTH } from '../../constants'

const MainPage = () => {
  const [modalSignInActive, setModalSignInActive] = useState(false)
  const [modalRegistration, setModalRegistration] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pincode, setPincode] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const pincodeHandler = e => {
    setPincode(e.target.value.trim())
    setErrorMessage(null)
  }
  const signInHandler = () => setModalSignInActive(true)
  const registrationHandler = () => setModalRegistration(true)

  const navigate = useNavigate()

  const playHandler = async () => {
    if (pincode.length !== UUID_LENGTH) {
      setErrorMessage('Введите корректный код')
      return
    }
    setIsLoading(true)
    try {
      const { data, error } = await supabase.from('games').select().eq('id', pincode)

      if (error || data.length === 0) {
        setErrorMessage('Такой игры не существует')
      }
      if (data.length > 0) {
        navigate(`/guess-play/${pincode}`)
      }
    } catch (err) {
      console.log(`Catch worked: ${err}`)
    } finally {
      setIsLoading(false)
    }
  }

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

      <main
        className={cn(
          styles.mainPage,
          (modalSignInActive || modalRegistration) && styles.mainPageBlurred
        )}
      >
        <div className={cn(styles.circle, styles.circleYellow)}></div>
        <div className={cn(styles.circle, styles.circlePink)}>
          <img className={styles.questionMark} src={QuestionMark} alt="question mark" />
        </div>

        <Nav
          currentPage="main"
          signInHandler={signInHandler}
          registrationHandler={registrationHandler}
        />

        <div className={styles.menu}>
          <img className={styles.quote} src={quoteImage} alt="Guessy" />
          <div className={styles.logo}>Guessy</div>
          <form className={styles.form}>
            <div className={cn(styles.userMessage, errorMessage && styles.error)}>
              {errorMessage}
            </div>

            <input
              value={pincode}
              onChange={pincodeHandler}
              className={styles.pincode}
              type="text"
              placeholder="Введите код доступа"
            />
            <Button onClick={playHandler} text="Играть" bgcolor="violet" size="big" />
          </form>
        </div>

        <footer>made by Dan</footer>
      </main>
    </>
  )
}

export default MainPage
