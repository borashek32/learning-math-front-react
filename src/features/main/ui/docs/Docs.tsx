import { GoTo } from '../../../../common/components/goTo/GoTo'
import { Header } from '../../../../common/components/header/Header'
import { useTranslation } from 'react-i18next'
import styles from './Docs.module.sass'
import { DevideLine } from '../../../../common/components/devideLine/DevideLine'
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll'

export const Docs = () => {
  const { t } = useTranslation()

  const handleSetActive = (to: string) => {
    console.log(to)
  }

  return (
    <div className={styles.docsWrapper}>
      <GoTo address='/' name={t('links.back')} />
      <Header title={t('screens.instructions')} />
      <ul className={styles.menuItems}>
        <li className={styles.item}>
          <Link
            to="withoutRegister" 
            spy={true} 
            smooth={true} 
            offset={-100} 
            duration={500} 
            className={styles.itemLink}
          >
            {t('instructions.withoutRegister.title')}
          </Link>
        </li>
        <li className={styles.item}>
          <Link
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            className={styles.itemLink}
            to="register"
          >
            {t('instructions.register.title')}
          </Link>
        </li>
        <li className={styles.item}>
          <Link
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            className={styles.itemLink}
            to="changePassword"
          >
            {t('instructions.changePassword.title')}
          </Link>
        </li>
        <li className={styles.item}>
          <Link
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            className={styles.itemLink}
            to="changeEmail"
          >
            {t('instructions.changeEmail.title')}
          </Link>
        </li>
        <li className={styles.item}>
          <Link
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            className={styles.itemLink}
            to="changeAvatar"
          >
            {t('instructions.changeAvatar.title')}
          </Link>
        </li>
        <li className={styles.item}>
          <Link
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            className={styles.itemLink}
            to="schoolProgram"
          >
            {t('instructions.schoolProgram.title')}
          </Link>
        </li>
        <li className={styles.item}>
          <Link
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            className={styles.itemLink}
            to="parentalControl"
          >
            {t('instructions.parentalControl.title')}
          </Link>
        </li>
      </ul>
      <DevideLine />
      <div className={styles.descWrapper} id="withoutRegister">
        <h2 className={styles.itemLink}>
          {t('instructions.withoutRegister.title')}
        </h2>

        <div>
          <p className={styles.itemDesc}>
            - {t('instructions.withoutRegister.allowedTools.1.title')}
          </p>
        </div>
        <div>
          <p className={styles.itemDesc}>
            - {t('instructions.withoutRegister.allowedTools.2.title')}
          </p>
        </div>
        <div>
          <p className={styles.itemDesc}>
            - {t('instructions.withoutRegister.allowedTools.3.title')}
          </p>
        </div>
        <div>
          <p className={styles.itemDesc}>
            - {t('instructions.withoutRegister.allowedTools.4.title')}
          </p>
        </div>
      </div>
      <div className={styles.descWrapper} id="register">
        <h2 className={styles.itemLink}>
          {t('instructions.register.title')}
        </h2>

        <div className={styles.itemLinkWrapper}>
          <h4 className={styles.itemDesc}>
            - {t('instructions.register.allowedTools.1.title')}
          </h4>
          <p className={styles.itemDescP}>
            {t('instructions.register.allowedTools.1.desc.1')}
          </p>
          <p className={styles.itemDescP}>
            {t('instructions.register.allowedTools.1.desc.2')}
          </p>
          <p className={styles.itemDescP}>
            {t('instructions.register.allowedTools.1.desc.3')}
          </p>
          <p className={styles.itemDescP}>
            {t('instructions.register.allowedTools.1.desc.4')}
          </p>
          <p className={styles.itemDescP}>
            {t('instructions.register.allowedTools.1.desc.5')}
          </p>
        </div>

        <div className={styles.itemLinkWrapper}>
          <h4 className={styles.itemDesc}>
            - {t('instructions.register.allowedTools.2.title')}
          </h4>
          <p className={styles.itemDescP}>
            {t('instructions.register.allowedTools.2.desc.1')}
          </p>
          <p className={styles.itemDescP}>
            {t('instructions.register.allowedTools.2.desc.2')}
          </p>
          <p className={styles.itemDescP}>
            {t('instructions.register.allowedTools.2.desc.3')}
          </p>
          <p className={styles.itemDescP}>
            {t('instructions.register.allowedTools.2.desc.4')}
          </p>
          <p className={styles.itemDescP}>
            {t('instructions.register.allowedTools.2.desc.5')}
          </p>
        </div>
      </div>
      <div className={styles.descWrapper} id="passwordRecover">
      <h2 className={styles.itemLink}>
        {t('instructions.passwordRecover.title')}
      </h2>

      <div className={styles.itemLinkWrapper}>
        <h4 className={styles.itemDesc}>
          - {t('instructions.passwordRecover.allowedTools.1.title')}
        </h4>
        <p className={styles.itemDescP}>
          {t('instructions.passwordRecover.allowedTools.1.desc.1')}
        </p>
        <p className={styles.itemDescP}>
          {t('instructions.passwordRecover.allowedTools.1.desc.2')}
        </p>
      </div>

      <div className={styles.itemLinkWrapper}>
        <h4 className={styles.itemDesc}>
          - {t('instructions.passwordRecover.allowedTools.2.title')}
        </h4>
        <p className={styles.itemDescP}>
          {t('instructions.passwordRecover.allowedTools.2.desc.1')}
        </p>
        <p className={styles.itemDescP}>
          {t('instructions.passwordRecover.allowedTools.2.desc.2')}
        </p>
      </div>

      <div className={styles.itemLinkWrapper}>
        <h4 className={styles.itemDesc}>
          - {t('instructions.passwordRecover.allowedTools.3.title')}
        </h4>
        <p className={styles.itemDescP}>
          {t('instructions.passwordRecover.allowedTools.3.desc.1')}
        </p>
        <p className={styles.itemDescP}>
          {t('instructions.passwordRecover.allowedTools.3.desc.2')}
        </p>
        <p className={styles.itemDescP}>
          {t('instructions.passwordRecover.allowedTools.3.desc.3')}
        </p>
        <p className={styles.itemDescP}>
          {t('instructions.passwordRecover.allowedTools.3.desc.4')}
        </p>
      </div>

        <div className={styles.itemLinkWrapper}>
          <h4 className={styles.itemDesc}>
            - {t('instructions.passwordRecover.allowedTools.4.title')}
          </h4>
          <p className={styles.itemDescP}>
            {t('instructions.passwordRecover.allowedTools.4.desc.1')}
          </p>
          <p className={styles.itemDescP}>
            {t('instructions.passwordRecover.allowedTools.4.desc.2')}
          </p>
        </div>
      </div>
      <div className={styles.descWrapper} id="changePassword">
        <h2 className={styles.itemLink}>
          {t('instructions.changePassword.title')}
        </h2>

        <div className={styles.itemLinkWrapper}>
          <h4 className={styles.itemDesc}>
            - {t('instructions.changePassword.allowedTools.1.title')}
          </h4>
          <p className={styles.itemDescP}>
            {t('instructions.changePassword.allowedTools.1.desc.1')}
          </p>
          <p className={styles.itemDescP}>
            {t('instructions.changePassword.allowedTools.1.desc.2')}
          </p>
        </div>

        <div className={styles.itemLinkWrapper}>
          <h4 className={styles.itemDesc}>
            - {t('instructions.changePassword.allowedTools.2.title')}
          </h4>
          <p className={styles.itemDescP}>
            {t('instructions.changePassword.allowedTools.2.desc.1')}
          </p>
          <p className={styles.itemDescP}>
            {t('instructions.changePassword.allowedTools.2.desc.2')}
          </p>
        </div>

        <div className={styles.itemLinkWrapper}>
          <h4 className={styles.itemDesc}>
            - {t('instructions.changePassword.allowedTools.3.title')}
          </h4>
          <p className={styles.itemDescP}>
            {t('instructions.changePassword.allowedTools.3.desc.1')}
          </p>
          <p className={styles.itemDescP}>
            {t('instructions.changePassword.allowedTools.3.desc.2')}
          </p>
        </div>

        <div className={styles.itemLinkWrapper}>
          <h4 className={styles.itemDesc}>
            - {t('instructions.changePassword.allowedTools.4.title')}
          </h4>
          <p className={styles.itemDescP}>
            {t('instructions.changePassword.allowedTools.4.desc.1')}
          </p>
          <p className={styles.itemDescP}>
            {t('instructions.changePassword.allowedTools.4.desc.2')}
          </p>
        </div>

        <div className={styles.itemLinkWrapper}>
          <h4 className={styles.itemDesc}>
            - {t('instructions.changePassword.allowedTools.5.title')}
          </h4>
          <p className={styles.itemDescP}>
            {t('instructions.changePassword.allowedTools.5.desc.1')}
          </p>
        </div>
      </div>
      <div className={styles.descWrapper} id="changeEmail">
        <h2 className={styles.itemLink}>
          {t('instructions.changeEmail.title')}
        </h2>

        <div className={styles.itemLinkWrapper}>
          <h4 className={styles.itemDesc}>
            - {t('instructions.changeEmail.allowedTools.1.title')}
          </h4>
          <p className={styles.itemDescP}>
            {t('instructions.changeEmail.allowedTools.1.desc.1')}
          </p>
          <p className={styles.itemDescP}>
            {t('instructions.changeEmail.allowedTools.1.desc.2')}
          </p>
        </div>

        <div className={styles.itemLinkWrapper}>
          <h4 className={styles.itemDesc}>
            - {t('instructions.changeEmail.allowedTools.2.title')}
          </h4>
          <p className={styles.itemDescP}>
            {t('instructions.changeEmail.allowedTools.2.desc.1')}
          </p>
          <p className={styles.itemDescP}>
            {t('instructions.changeEmail.allowedTools.2.desc.2')}
          </p>
        </div>

        <div className={styles.itemLinkWrapper}>
          <h4 className={styles.itemDesc}>
            - {t('instructions.changeEmail.allowedTools.3.title')}
          </h4>
          <p className={styles.itemDescP}>
            {t('instructions.changeEmail.allowedTools.3.desc.1')}
          </p>
          <p className={styles.itemDescP}>
            {t('instructions.changeEmail.allowedTools.3.desc.2')}
          </p>
        </div>

        <div className={styles.itemLinkWrapper}>
          <h4 className={styles.itemDesc}>
            - {t('instructions.changeEmail.allowedTools.4.title')}
          </h4>
          <p className={styles.itemDescP}>
            {t('instructions.changeEmail.allowedTools.4.desc.1')}
          </p>
          <p className={styles.itemDescP}>
            {t('instructions.changeEmail.allowedTools.4.desc.2')}
          </p>
        </div>
      </div>
      <div className={styles.descWrapper} id="changeAvatar">
        <h2 className={styles.itemLink}>
          {t('instructions.changeAvatar.title')}
        </h2>

        <div className={styles.itemLinkWrapper}>
          <h4 className={styles.itemDesc}>
            - {t('instructions.changeAvatar.allowedTools.1.title')}
          </h4>
          <p className={styles.itemDescP}>
            {t('instructions.changeAvatar.allowedTools.1.desc.1')}
          </p>
          <p className={styles.itemDescP}>
            {t('instructions.changeAvatar.allowedTools.1.desc.2')}
          </p>
          <p className={styles.itemDescP}>
            {t('instructions.changeAvatar.allowedTools.1.desc.3')}
          </p>
        </div>

        <div className={styles.itemLinkWrapper}>
          <h4 className={styles.itemDesc}>
            - {t('instructions.changeAvatar.allowedTools.2.title')}
          </h4>
          <p className={styles.itemDescP}>
            {t('instructions.changeAvatar.allowedTools.2.desc.1')}
          </p>
          <p className={styles.itemDescP}>
            {t('instructions.changeAvatar.allowedTools.2.desc.2')}
          </p>
        </div>
      </div>
      <div className={styles.descWrapper} id="schoolProgram">
        <h2 className={styles.itemLink}>
          {t('instructions.schoolProgram.title')}
        </h2>
        <p className={styles.itemDesc}>
          {t('instructions.schoolProgram.desc')}
        </p>
      </div>
      <div className={styles.descWrapper} id="parentalControl">
        <h2 className={styles.itemLink}>
          {t('instructions.parentalControl.title')}
        </h2>
        <p className={styles.itemDesc}>
          {t('instructions.parentalControl.desc')}
        </p>
      </div>
    </div>
  )
}