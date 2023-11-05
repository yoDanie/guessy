import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CREATE_NEW_GUESS_PAGE } from '../../constants'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../supabaseClient'
import Button from '../UI/Buttons/Button'
import MyLink from '../UI/Buttons/MyLink'
import styles from './Nav.module.css'

const Nav = ({ currentPage, signInHandler, registrationHandler, children }) => {
  const logout = () => supabase.auth.signOut()

  const user = supabase.auth.user()
  const navigate = useNavigate()
  const { session } = useAuth()

  useEffect(() => {
    if (user === null && currentPage !== 'gameplay') navigate('/')
  }, [session])

  return (
    <>
      {user ? (
        <nav className={styles.nav}>
          {children}
          {currentPage === 'main' && (
            <>
              <MyLink
                to="/create-guess"
                bgcolor="green"
                size="small"
                text={CREATE_NEW_GUESS_PAGE}
                customStyle="spacing"
              />
              <MyLink
                to={`/profile/${user.id}`}
                bgcolor="yellow"
                size="small"
                text="Профиль"
                customStyle="spacing"
              />
            </>
          )}
          {currentPage === 'gameplay' && (
            <>
              <MyLink
                to="/create-guess"
                bgcolor="green"
                size="small"
                text={CREATE_NEW_GUESS_PAGE}
                customStyle="spacing"
              />
              <MyLink
                to={`/profile/${user.id}`}
                bgcolor="yellow"
                size="small"
                text="Профиль"
                customStyle="spacing"
              />
            </>
          )}
          {currentPage === 'profile' && (
            <>
              <MyLink
                to="/create-guess"
                bgcolor="green"
                size="small"
                text={CREATE_NEW_GUESS_PAGE}
                customStyle="spacing"
              />
              <Button
                bgcolor="white"
                customStyle="spacing"
                size="small"
                text="Выход"
                onClick={logout}
              />
            </>
          )}
          {(currentPage === 'create-guess' || currentPage === 'edit-guess') && (
            <>
              <MyLink
                to={`/profile/${user.id}`}
                bgcolor="yellow"
                size="small"
                text="Профиль"
                customStyle="spacing"
              />
            </>
          )}
        </nav>
      ) : (
        <nav className={styles.nav}>
          <Button
            onClick={signInHandler}
            text="Войти"
            bgcolor="violet"
            size="small"
            customStyle="spacing"
          />
          <Button
            onClick={registrationHandler}
            text="Регистрация"
            bgcolor="violet"
            size="small"
            customStyle="spacing"
          />
        </nav>
      )}
    </>
  )
}

export default Nav
