import { useState, useEffect } from 'react'
import GuessList from '../../components/GuessList/GuessList'
import Header from '../../components/Header/Header'
import Nav from '../../components/Nav/Nav'
import styles from './ProfilePage.module.css'
import QuestionMark from './questionMark.png'
import cn from 'classnames'
import { supabase } from '../../supabaseClient'
import Loader from '../../components/UI/Loader/Loader'

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState(null)

  const user = supabase.auth.user()

  useEffect(() => {
    fetchProfileData()
  }, [user])

  const fetchProfileData = async () => {
    setIsLoading(true)
    try {
      const { data } = await supabase.from('games').select().eq('userId', user.id)
      setProfileData(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && <Loader />}

      <Header pageTitle="Мой профиль">
        <Nav currentPage="profile" />
      </Header>
      <main className={styles.mainPage}>
        <div className={cn(styles.circle, styles.circlePink)}></div>
        <div className={cn(styles.circle, styles.circleGreen)}>
          <img className={styles.questionMark} src={QuestionMark} alt="question mark" />
        </div>

        {profileData && (
          <GuessList
            profileData={profileData}
            setProfileData={setProfileData}
            setIsLoading={setIsLoading}
          />
        )}
      </main>
    </>
  )
}

export default ProfilePage
