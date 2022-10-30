import Logo from '../components/Logo'
import MealList from '../components/Home/MealList'
import MealNutrients from '../components/Home/MealNutrients'
import Page from '../components/Page'
import Resume from '../components/Home/Resume'
import { useMeal } from '../contexts/MealContext'
import { useUser } from '../contexts/UserContext'
import styles from './Home.module.css'

export default function Home() {
  const { meals, foodEnergy } = useMeal()
  const { user } = useUser()

  return (
    <Page className={styles.page} checkFirstLogin={true}>
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
      <section>
        <h1>Nutrientes</h1>
        <MealNutrients meals={meals} />
      </section>
    </Page>
  )
}