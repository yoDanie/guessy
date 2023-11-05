import styles from './Wrapper.module.css'
import cn from 'classnames'

const Button = ({ type, onClick, text, bgcolor, size, customStyle }) => {
  return (
    <div className={cn(styles.wrapper, size ? styles[size] : styles.big, styles[customStyle])}>
      <button
        type={type ? type : 'button'}
        onClick={onClick}
        className={cn(styles.element, bgcolor ? styles[bgcolor] : styles.violet)}
      >
        {text}
      </button>
    </div>
  )
}

export default Button
