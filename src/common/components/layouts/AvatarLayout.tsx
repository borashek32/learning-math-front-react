import styles from './Layouts.module.sass'
import { Nav } from '../nav/Nav'
import { Props } from './Layouts.types'
import { SelectLang } from '../selectLang/SelectLang'

export const AvatarLayout = ({ children }: Props) => {

  return (
    <>
      <SelectLang />
      <Nav />
      <div className={styles.avatarContent}>
        { children }
      </div>
    </>
  )
}