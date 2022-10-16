import Logo from '../components/Logo'
import Meal from '../components/Home/Meal'
import Resume from '../components/Home/Resume'
import { useMeal } from '../contexts/MealContext'
import styles from './Home.module.css'

export default function Home() {
  const { meals, foodEnergy, baseEnergy } = useMeal()
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
      <section>
        <h1>Resumo</h1>
        <Resume baseEnergy={baseEnergy} foodEnergy={foodEnergy} />
      </section>
      <section>
        <h1>Refeições</h1>
        <Meal meals={meals} />
      </section>
    </div>
  )
}