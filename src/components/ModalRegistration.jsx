import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { validateSignUp } from '../utils/validators'
import Button from './UI/Buttons/Button'
import Loader from './UI/Loader/Loader'
import Modal from './UI/Modal/Modal'

const ModalRegistration = ({ modalRegistration, setModalRegistration }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const emailHandler = e => {
    setEmail(e.target.value.trim())
    setErrorMessage(null)
  }
  const passwordHandler = e => {
    setPassword(e.target.value)
    setErrorMessage(null)
  }
  const passwordConfirmHandler = e => {
    setPasswordConfirm(e.target.value)
    setErrorMessage(null)
  }

  const registrationHandler = async e => {
    e.preventDefault()

    const validationError = validateSignUp(email, password, passwordConfirm)
    if (validationError) {
      setErrorMessage(validationError)
      return
    }

    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })
      if (error) {
        setErrorMessage(error.error_description || error.message)
      } else {
        setSuccessMessage('Регистрация прошла успешно!')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && <Loader />}

      <Modal
        submitHandler={registrationHandler}
        modalActive={modalRegistration}
        setModalActive={setModalRegistration}
        title="Регистрация"
        design="yellow"
        errorMessage={errorMessage}
        successMessage={successMessage}
      >
        <label>
          Email
          <input
            placeholder="player@mail.com"
            type="text"
            name="email"
            value={email}
            onChange={emailHandler}
          />
        </label>
        <label>
          Пароль
          <input
            placeholder="Супер-секретный"
            type="password"
            name="password"
            value={password}
            onChange={passwordHandler}
          />
        </label>
        <label>
          Подтвердите пароль
          <input
            placeholder="И еще раз"
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={passwordConfirmHandler}
          />
        </label>

        <Button type="submit" text="Зарегистрироваться" size="medium" customStyle="center" />
      </Modal>
    </>
  )
}

export default ModalRegistration
