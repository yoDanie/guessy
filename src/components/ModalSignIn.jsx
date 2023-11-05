import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { validateSignIn } from '../utils/validators'
import Button from './UI/Buttons/Button'
import Loader from './UI/Loader/Loader'
import Modal from './UI/Modal/Modal'

const ModalSignIn = ({ modalSignInActive, setModalSignInActive }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const emailHandler = e => {
    setEmail(e.target.value.trim())
    setErrorMessage(null)
  }
  const passwordHandler = e => {
    setPassword(e.target.value)
    setErrorMessage(null)
  }

  const signInHandler = async e => {
    e.preventDefault()

    const validationError = validateSignIn(email, password)
    if (validationError) {
      setErrorMessage(validationError)
      return
    }

    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signIn({
        email: email,
        password: password,
      })
      if (error) {
        setErrorMessage(error.error_description || error.message)
      } else {
        setModalSignInActive(false)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && <Loader />}

      <Modal
        submitHandler={signInHandler}
        modalActive={modalSignInActive}
        setModalActive={setModalSignInActive}
        design="grey"
        title="Авторизация"
        errorMessage={errorMessage}
      >
        <label>
          Введите Email
          <input
            placeholder="Ваш Email"
            type="text"
            name="email"
            value={email}
            onChange={emailHandler}
          />
        </label>

        <label>
          Введите пароль
          <input
            placeholder="Ваш пароль"
            type="password"
            name="password"
            value={password}
            onChange={passwordHandler}
          />
        </label>

        <Button type="submit" size="medium" text="Войти" customStyle="center" />
      </Modal>
    </>
  )
}

export default ModalSignIn
