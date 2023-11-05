import { ReactComponent as PlayIcon } from '../../assets/icons/play.svg'
import styles from './Actions.module.css'
import { Link } from 'react-router-dom'

const PlayAction = ({ id }) => {
  return (
    <Link to={`/guess-play/${id}`} className={styles.actionItem}>
      <span className={styles.tip}>Сыграть</span>
      <PlayIcon className={styles.icon} />
    </Link>
  )
}

export default PlayAction
