import Tag from '../textCall/tag/Tag'
import { useTranslation } from 'react-i18next'

function TextCall() {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-4">
        <Tag />
        <h1 className="text-[#1b0e10] dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">{t('home.hero.title_1')} <span className="text-primary">{t('home.hero.title_2')}</span> {t('home.hero.title_3')}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg lg:text-xl font-normal">{t('home.hero.description')}</p>
    </div>
  )
}

export default TextCall