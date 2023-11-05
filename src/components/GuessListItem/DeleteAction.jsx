import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg'
import styles from './Actions.module.css'

const DeleteAction = ({ deleteModalHandler }) => (
  <button onClick={deleteModalHandler} className={styles.actionItem} type="button">
    <span className={styles.tip}>Удалить</span>
    <DeleteIcon className={styles.icon} />
  </button>
)

export default DeleteAction
