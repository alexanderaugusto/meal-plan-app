import Card from '../Card'
import CircularProgress from '../CircularProgress'
import Icon from '../Icon'
import utilityHelper from '../../utils/helper/utilityHelper'
import styles from './Resume.module.css'

interface ResumeProps {
  baseEnergy: number
  foodEnergy: number
}

export default function Resume({ baseEnergy = 1500, foodEnergy }: ResumeProps) {
  return (
    <Card className={styles.resume} to='/calories/choose'>
      <h2>Calorias</h2>
      <p>Porcentagem de calorias diárias baseadas nas refeições adicionadas</p>
      <div className={styles.container}>
        <CircularProgress
          value={utilityHelper.calculateCircularProgressPercentage(foodEnergy, baseEnergy)}
          colors={{
            path: utilityHelper.getColorFromVariable('--color-primary'),
            trail: utilityHelper.getColorFromVariable('--color-grey-light'),
            text: utilityHelper.getColorFromVariable('--color-grey')
          }}
        />
        <ul>
          <li>
            <Icon className={`${styles['icon']} ${styles['icon-energy']}`} icon='fire' />
            <p>
              Calorias Base <br />
              <b>{utilityHelper.formatNumber(baseEnergy, 0)}</b>
            </p>
          </li>
          <li>
            <Icon className={`${styles['icon']} ${styles['icon-food']}`} icon='utensils' />
            <p>
              Alimentos <br />
              <b>{utilityHelper.formatNumber(foodEnergy, 0)}</b>
            </p>
          </li>
        </ul>
      </div>
    </Card>
  )
}