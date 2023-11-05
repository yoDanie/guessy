import GuessListItem from '../GuessListItem/GuessListItem'
import styles from './GuessList.module.css'

const GuessList = ({ profileData, setProfileData, setIsLoading }) => {
  return (
    <>
      <div className={styles.guessListTitle}>Мои квизы</div>
      <div className={styles.guessList}>
        {profileData.length > 0 ? (
          profileData.map(game => (
            <GuessListItem
              key={game.id}
              id={game.id}
              title={game.gameTitle}
              totalQuestions={game.questions.length}
              profileData={profileData}
              setProfileData={setProfileData}
              setIsLoading={setIsLoading}
            />
          ))
        ) : (
          <div className={styles.empty}>У вас еще нет созданных квизов</div>
        )}
      </div>
    </>
  )
}

export default GuessList
