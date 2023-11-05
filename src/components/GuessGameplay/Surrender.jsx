import styles from './Surrender.module.css'
import Doit from '../../assets/images/doit.gif'

const Surrender = () => {
  return (
    <div className={styles.surrenderWrapper}>
      <img className={styles.surrender} src={Doit} alt="lol" />
    </div>
  )
}

export default Surrender
