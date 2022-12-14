import styles from './Logo.module.css'

import LOGO_RED from '../assets/img/logo-red.png'
import LOGO_WHITE from '../assets/img/logo-white.png'
import LOGO_BLACK from '../assets/img/logo-black.png'
import LOGO_ICON_RED from '../assets/img/logo-icon-red.png'
import LOGO_ICON_WHITE from '../assets/img/logo-icon-white.png'
import LOGO_ICON_BLACK from '../assets/img/logo-icon-black.png'

interface LogoSizeProps {
  width: string
  height: string
}
interface LogoPros {
  color: string
  icon?: boolean
  size?: LogoSizeProps
}

interface LogoTypesProps {
  [key: string]: string
}

export default function Logo({ color = 'orange', icon = false, size }: LogoPros) {
  const logoTypes: LogoTypesProps = {
    red: LOGO_RED,
    white: LOGO_WHITE,
    black: LOGO_BLACK
  }

  const logoIconTypes: LogoTypesProps = {
    red: LOGO_ICON_RED,
    white: LOGO_ICON_WHITE,
    black: LOGO_ICON_BLACK
  }

  return (
    <img
      className={styles.logo}
      style={{ width: size?.width, height: size?.height }}
      src={icon ? logoIconTypes[color] : logoTypes[color]}
      alt="logo"
    />
  )
}