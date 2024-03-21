import { Props } from "./AppText.types"
import { FC } from "react"
import styles from './Text.module.sass'

export const AppText: FC<Props> = ({ desc, onPress, link }: Props) => {

  return <p 
    className={`${styles.digitsText} ${link ? styles.linkText : ''}`} 
    onClick={onPress}
  >
    {desc}
  </p>
}