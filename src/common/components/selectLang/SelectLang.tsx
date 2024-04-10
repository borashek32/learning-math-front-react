import { useTranslation } from 'react-i18next'
import styles from './SelectLang.module.sass'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { setAppLang } from '../../../app/app.slice'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectAppLang } from '../../../app/app.selectors'

export const SelectLang = () => {
  const { t, i18n } = useTranslation('translation')
  const appLang = useAppSelector(selectAppLang)
  const dispatch = useDispatch()

  const changeLang = (lang: string) => {
    dispatch(setAppLang(lang))
  }

  useEffect(() => {
    i18n.changeLanguage(appLang)
  }, [appLang])

  return (
    <div className={styles.selectWrapper}>
      <div>
        <p className={styles.change}>{t("changeLang.select")}</p>
        <select 
          className={styles.select} 
          value={appLang}
          onChange={(e) => changeLang(e.target.value)}
        >
          <option value='en'>
            {t("changeLang.options.en")}
          </option>
          <option value='ru'>
            {t("changeLang.options.ru")}
          </option>
        </select>
      </div>
    </div>
  )
}
