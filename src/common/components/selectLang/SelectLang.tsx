import { useTranslation } from 'react-i18next'
import styles from './SelectLang.module.sass'

export const SelectLang = () => {
  const { t, i18n } = useTranslation('translation')

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <div className={styles.selectWrapper}>
      <div>
        <p className={styles.change}>{t("changeLang.select")}</p>

        <select className={styles.select} onChange={(e) => changeLang(e.target.value)}>
          <option value='en'>{t("changeLang.options.en")}</option>
          <option value='ru'>{t("changeLang.options.ru")}</option>
        </select>
      </div>
    </div>
  )
}
