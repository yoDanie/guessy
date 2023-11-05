import { Link } from 'react-router-dom'
import styles from './Wrapper.module.css'
import cn from 'classnames'

const MyLink = ({ to, text, bgcolor, size, customStyle }) => {
  return (
    <div className={cn(styles.wrapper, size ? styles[size] : styles.big, styles[customStyle])}>
      <Link className={cn(styles.element, bgcolor ? styles[bgcolor] : styles.violet)} to={to}>
        {text}
      </Link>
    </div>
  )
}

export default MyLink
