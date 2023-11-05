import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg'
import styles from './Actions.module.css'
import { Link } from 'react-router-dom'

const EditAction = ({ id }) => (
  <Link to={`/edit-guess/${id}`} className={styles.actionItem}>
    <span className={styles.tip}>Редактировать</span>
    <EditIcon className={styles.icon} />
  </Link>
)

export default EditAction
