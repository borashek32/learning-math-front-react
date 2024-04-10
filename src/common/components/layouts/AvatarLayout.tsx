import styles from './Layouts.module.sass'
import { Nav } from '../nav/Nav'
import { Props } from './Layouts.types'
import { SelectLang } from '../selectLang/SelectLang'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectUser } from '../../../features/auth/auth.selectors'

export const AvatarLayout = ({ children }: Props) => {

  return (
    <div className={styles.avatarContent}>
      <SelectLang />
      <Nav />
      <div className={styles.avatar}>
        { children }
      </div>
    </div>
  )
}