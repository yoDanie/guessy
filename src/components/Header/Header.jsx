import { Link } from 'react-router-dom'
import styles from './Header.module.css'

const Header = ({ pageTitle, children }) => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Guessy
      </Link>
      <h1 className={styles.pageTitle}>{pageTitle}</h1>
      {children}
    </header>
  )
}

export default Header
