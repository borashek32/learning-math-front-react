import styles from './Layouts.module.sass'
import { Nav } from '../nav/Nav'
import { Props } from './Layouts.types'
import { SelectLang } from '../selectLang/SelectLang'

export const AvatarLayout = ({ children }: Props) => {

  return (
    <div className={styles.avatarContent}>
      <SelectLang />
      <Nav />
      <div>
        { children }
      </div>
    </div>
  )
}