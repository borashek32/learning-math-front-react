import { useTranslation } from 'react-i18next'
import styles from './SelectLang.module.sass'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { setAppLang } from '../../../app/app.slice'

export const SelectLang = () => {
  const { t, i18n } = useTranslation('translation')
  const [lang, setLang] = useState<string>('en')
  const dispatch = useDispatch()

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang)
    setLang(lang)
  }

  useEffect(() => {
    dispatch(setAppLang(lang))
  }, [lang])

  return (
    <div className={styles.selectWrapper}>
      <div>
        <p className={styles.change}>{t("changeLang.select")}</p>
        <select 
          className={styles.select} 
          onChange={(e) => changeLang(e.target.value)}
        >
          <option value='en'>{t("changeLang.options.en")}</option>
          <option value='ru'>{t("changeLang.options.ru")}</option>
        </select>
      </div>
    </div>
  )
}
