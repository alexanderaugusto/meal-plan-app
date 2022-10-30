import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import styles from './Page.module.css'

interface PageProps {
  className?: string
  checkFirstLogin: boolean
  children: ReactNode
}

export default function Page({ className, checkFirstLogin, children }: PageProps) {
  const { firstLogin } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (firstLogin && checkFirstLogin) {
      navigate('/calories/choose')
    }
  }, [firstLogin, checkFirstLogin, navigate])

  return (
    <div className={`${styles.page} ${className}`}>
      {children}
    </div>
  )
}