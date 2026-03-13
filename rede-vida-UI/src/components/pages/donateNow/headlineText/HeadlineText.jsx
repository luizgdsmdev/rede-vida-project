import { useTranslation } from 'react-i18next'
import ScrollAnimation from '../../../shared/ScrollAnimation/ScrollAnimation'

function HeadlineText() {
  const { t } = useTranslation()
  return (
    <ScrollAnimation className="text-center mb-10">
      <h1 className="text-[#1b0e10] dark:text-white text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] tracking-tight px-4 pb-3 pt-6">
        {t('donateNow.headline')}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg lg:text-xl font-normal leading-normal px-4 max-w-2xl mx-auto">
        {t('donateNow.subheadline')}
      </p>
    </ScrollAnimation>
  )
}

export default HeadlineText