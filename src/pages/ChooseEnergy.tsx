import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import { ProgressStep, Step } from '../components/ProgressSteps'
import Input from '../components/Input'
import Page from '../components/Page'
import { useUser } from '../contexts/UserContext'
import userService from '../services/userService'
import utilityHelper from '../utils/helper/utilityHelper'
import styles from './ChooseEnergy.module.css'

import PROGRESS_STEP_1 from '../assets/img/choose-energy-step-1.svg'
import PROGRESS_STEP_2 from '../assets/img/choose-energy-step-2.svg'
import PROGRESS_STEP_3 from '../assets/img/choose-energy-step-3.svg'

export default function ChooseEnergy() {
  const { user, setFirstLogin, getUser } = useUser()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [weight, setWeight] = useState(60)
  const [gender, setGender] = useState('')
  const [energy, setEnergy] = useState(0)

  useEffect(() => {
    if (user.id) {
      setWeight(user.weight)
      setGender(user.gender)
      setEnergy(user.baseEnergy)
    }
  }, [user])

  function nextStep() {
    setStep(step + 1)
  }

  function previousStep() {
    setStep(step - 1)
  }

  function calculateEnergy() {
    let energy = 0
    if (gender === 'F') {
      energy = (0.062 * weight + 2.036) * 239
    } else {
      energy = (0.063 * weight + 2.896) * 239
    }
    setEnergy(Number(utilityHelper.formatNumber(energy, 0)))
  }

  function backToHome() {
    setFirstLogin(false)
    getUser()
    navigate('/')
  }

  function saveUser() {
    const newUser = { ...user, gender, weight, baseEnergy: energy }

    if (user.id) {
      userService.update(newUser)
        .then(() => {
          backToHome()
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      userService.add(newUser)
        .then(() => {
          backToHome()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <Page className={styles.page} checkFirstLogin={false}>
      <ProgressStep step={step}>
        <Step
          className={`${styles.step} ${styles['step-1']}`}
          onNext={nextStep}
          disableNext={gender === ''}
        >
          <img src={PROGRESS_STEP_1} alt="Passo 1" />
          <h2>Qual o seu gênero?</h2>
          <ul className={styles['gender-container']}>
            <li className={gender === 'F' ? styles['gender-selected'] : ''}>
              <button className="btn-icon" onClick={() => setGender('F')}>
                <Icon className={styles['icon-gender-mini']} icon="venus" />
                <Icon className={styles['icon-gender']} icon="female" />
              </button>
            </li>
            <li className={gender === 'M' ? styles['gender-selected'] : ''}>
              <button className="btn-icon" onClick={() => setGender('M')}>
                <Icon className={styles['icon-gender-mini']} icon="mars" />
                <Icon className={styles['icon-gender']} icon="male" />
              </button>
            </li>
          </ul>
        </Step>
        <Step
          className={`${styles.step} ${styles['step-2']}`}
          onNext={() => {
            calculateEnergy()
            nextStep()
          }}
          onPrevious={previousStep}
        >
          <img src={PROGRESS_STEP_2} alt="Passo 1" />
          <h2>Qual o seu peso (kg)?</h2>
          <Input
            type="text"
            value={weight}
            placeholder='Meu peso'
            onChange={(e) => setWeight(Number(e.target.value.replace(/[^0-9]/g, '')))}
          />
        </Step>
        <Step
          className={`${styles.step} ${styles['step-3']}`}
          onNext={saveUser}
          onPrevious={previousStep}
        >
          <img src={PROGRESS_STEP_3} alt="Passo 1" />
          <h2>Sua caloria base foi calculada</h2>
          <Input
            type="text"
            value={energy}
            placeholder='Minhas calorias gastas por dia'
            onChange={(e) => setEnergy(Number(e.target.value.replace(/[^0-9]/g, '')))}
          />
        </Step>
      </ProgressStep>
    </Page>
  )
}