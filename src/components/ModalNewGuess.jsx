import Button from './UI/Buttons/Button'
import MyLink from './UI/Buttons/MyLink'
import Modal from './UI/Modal/Modal'
import { supabase } from '../supabaseClient'

const ModalNewGuess = ({
  modalNewGuessActive,
  setModalNewGuessActive,
  gameTitle,
  setGameTitle,
  newGuessHandler,
  errorMessage,
  setErrorMessage,
  successMessage,
}) => {
  const titleInputHandler = e => (setGameTitle(e.target.value), setErrorMessage(null))
  const user = supabase.auth.user()
  return (
    <Modal
      design="grey"
      modalActive={modalNewGuessActive}
      setModalActive={setModalNewGuessActive}
      title="Сохранение игры"
      submitHandler={newGuessHandler}
      errorMessage={errorMessage}
      successMessage={successMessage}
    >
      <>
        {successMessage ? (
          <MyLink
            to={`/profile/${user.id}`}
            text="Перейти в профиль"
            size="small"
            customStyle="center"
            bgcolor="violet"
          />
        ) : (
          <>
            <label>
              Название игры
              <input
                placeholder="Название"
                type="text"
                value={gameTitle}
                onChange={titleInputHandler}
              />
            </label>
            <Button type="submit" size="medium" text="Сохранить" customStyle="center" />
          </>
        )}
      </>
    </Modal>
  )
}

export default ModalNewGuess
