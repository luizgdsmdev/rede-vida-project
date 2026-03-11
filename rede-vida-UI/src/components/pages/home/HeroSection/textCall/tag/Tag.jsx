import { useTranslation } from 'react-i18next'

function Tag() {
  const { t } = useTranslation()
  return (
    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full w-fit">{t('home.hero.tag')}</span>
  )
}

export default Tag