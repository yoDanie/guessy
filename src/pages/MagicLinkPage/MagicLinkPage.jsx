import { useState } from 'react'
import styles from './MagicLinkPage.module.css'
import { supabase } from '../../supabaseClient'
import Loader from '../../components/UI/Loader/Loader'
import Button from '../../components/UI/Buttons/Button'

const MagicLinkPage = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const emailInputHandler = e => setEmail(e.target.value)

  const handleMagicLinkSubmit = async event => {
    event.preventDefault()

    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.content}>
        <div className={styles.signup}>
          <h1 className={styles.title}>MagicLink</h1>
          <div>*Авторизация по ссылке, которая придет на указанную электронную почту</div>
          <form className={styles.form} onSubmit={handleMagicLinkSubmit}>
            <div className={styles.inputLabel}>Email</div>
            <input
              className={styles.input}
              placeholder="player@mail.com"
              type="email"
              name="email"
              value={email}
              onChange={emailInputHandler}
            />
            <Button
              type="submit"
              text="Отправить"
              bgcolor="violet"
              size="medium"
              customStyle="center"
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default MagicLinkPage
