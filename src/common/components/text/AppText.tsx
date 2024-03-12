import { Props } from "./AppText.types"
import { FC } from "react"
import styles from './Text.module.sass'

export const AppText: FC<Props> = ({ desc, onPress }: Props) => {

  return <p className={styles.digitsText} onClick={onPress}>{desc}</p>
}