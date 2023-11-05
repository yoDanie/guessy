import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg'
import styles from './Actions.module.css'

const ShareAction = ({ id }) => {
  const shareHandler = () => {
    navigator.share({ url: `https://guessy-quiz.netlify.app/guess-play/${id}` })
  }

  return (
    <button onClick={shareHandler} className={styles.actionItem} type="button">
      <span className={styles.tip}>Поделиться</span>
      <ShareIcon className={styles.icon} />
    </button>
  )
}

export default ShareAction
