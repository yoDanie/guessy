import React from 'react'
import styles from './NotFoundPage.module.css'
import MyLink from '../../components/UI/Buttons/MyLink'
const NotFoundPage = () => (
  <main className={styles.main}>
    <div className={styles.wrapper}>
      <div className={styles.circle}>
        <span className={styles.error}>404</span>
      </div>
    </div>
    <p className={styles.text}>Квиз/страница не существует или она была удалена.</p>
    <MyLink to="/" text="На главную" bgcolor="violet" size="medium" />
  </main>
)

export default NotFoundPage
