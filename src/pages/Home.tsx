import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import MealList from '../components/Home/MealList'
import Resume from '../components/Home/Resume'
import { useMeal } from '../contexts/MealContext'
import { useUser } from '../contexts/UserContext'
import styles from './Home.module.css'

export default function Home() {
  const { meals, foodEnergy } = useMeal()
  const { user, firstLogin } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (firstLogin) {
      navigate('/calories/choose')
    }
  }, [firstLogin, navigate])

  return (
    <div className={styles.page}>
      <section className={styles['logo-section']}>
        <Logo
          color='red'
          size={{
            width: '80%',
            height: 'auto'
          }}
        />
      </section>
      <section className={styles['resume-section']}>
        <h1>Resumo</h1>
        <Resume baseEnergy={user.baseEnergy} foodEnergy={foodEnergy} />
      </section>
      <section>
        <h1>Refeições</h1>
        <MealList meals={meals} />
      </section>
    </div>
  )
}