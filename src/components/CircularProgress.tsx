import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import styles from './CircularProgress.module.css'

interface ColorsProps {
  path: string
  trail: string
  text: string
}

interface CircularProgressProps {
  value: number
  colors: ColorsProps
}

export default function CircularProgress({ value, colors }: CircularProgressProps) {
  return (
    <div className={styles['circular-progress']}>
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        styles={buildStyles({
          pathColor: colors.path,
          textColor: colors.text,
          trailColor: colors.trail
        })}
      />
    </div>
  )
}