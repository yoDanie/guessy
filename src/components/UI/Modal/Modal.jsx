import React from 'react'
import styles from './Modal.module.css'
import cn from 'classnames'

const Modal = ({
  title,
  modalActive,
  setModalActive,
  children,
  submitHandler,
  design,
  errorMessage,
  successMessage,
}) => {
  const hideModalHandler = () => setModalActive(false)
  const disableBackgroundEvents = e => e.stopPropagation()
  return (
    <>
      <div
        className={cn(styles.modalWrapper, modalActive && styles.active)}
        onMouseDown={hideModalHandler}
      >
        <div
          className={cn(styles.modal, design ? styles[design] : styles.grey)}
          onMouseDown={disableBackgroundEvents}
        >
          <button className={styles.closeModal} onClick={hideModalHandler}></button>
          <h1 className={styles.title}>{title}</h1>
          <form className={styles.form} onSubmit={submitHandler}>
            <div
              className={cn(
                styles.userMessage,
                errorMessage && styles.error,
                successMessage && styles.success
              )}
            >
              {errorMessage && errorMessage}
              {successMessage && successMessage}
            </div>
            {children}
          </form>
        </div>
      </div>
    </>
  )
}

export default Modal
