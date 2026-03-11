import TextCall from './textCall/TextCall'
import IinputWhereDonate from './inputWhereDonate/IinputWhereDonate'
import HeroImage from './heroImage/HeroImage'
import { useTranslation } from 'react-i18next'

function HeroSection() {
  const { t } = useTranslation()
  return (
    <section className="w-full bg-white dark:bg-background-dark px-4 sm:px-6 lg:px-8 py-12 md:py-12">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-10 lg:flex-row items-center lg:items-start">
                <div className="flex flex-col gap-8 sm:gap-14 lg:gap-16 flex-1 lg:pr-8 w-full">
                    <TextCall />
                    <div className="flex flex-col gap-3 w-full">
                    <p className="text-sm font-semibold text-[#1b0e10] dark:text-gray-300 px-1">{t('home.hero.inputPlaceholderLabel')}</p>
                        <IinputWhereDonate />
                    </div>
                </div>
                <HeroImage />
            </div>
        </div>
    </section>
  )
}

export default HeroSection