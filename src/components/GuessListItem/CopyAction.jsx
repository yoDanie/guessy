import { useState } from 'react'
import { ReactComponent as CopyIcon } from '../../assets/icons/copy.svg'
import styles from './Actions.module.css'

const CopyAction = ({ id }) => {
  const [tipActive, setTipActive] = useState(false)

  const pincodeCopyHandler = () => {
    navigator.clipboard.writeText(id)
    setTipActive(true)
    setTimeout(() => {
      setTipActive(false)
    }, 3000)
  }

  return (
    <button onClick={pincodeCopyHandler} className={styles.actionItem}>
      <span className={styles.tip}>{tipActive ? 'Скопировано!' : 'Код доступа'}</span>
      <CopyIcon className={styles.icon} />
    </button>
  )
}

export default CopyAction
