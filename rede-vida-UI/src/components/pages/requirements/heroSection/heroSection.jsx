import { useTranslation } from 'react-i18next'
import ScrollAnimation from '../../../shared/ScrollAnimation/ScrollAnimation'

function HeroSection() {
  const { t } = useTranslation()
  return (
    <section className="w-full bg-white dark:bg-background-dark px-4 sm:px-6 lg:px-8 py-12 md:py-12 pt-20 pb-20">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-10 lg:flex-row items-center lg:items-start">
                <div className="flex flex-col gap-8 sm:gap-14 lg:gap-16 flex-1 lg:pr-8 w-full max-[680px]:text-center max-[680px]:items-center">
                    <ScrollAnimation animation="fade-up" delay={100}>
                    <div className="flex flex-col gap-6">
                        <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xltext-[#1b0e10] dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">{t('requirements.hero.title')}</h1>
                        <p className="text-slate-600 dark:text-slate-400 text-lg font-normal leading-relaxed">{t('requirements.hero.description')}</p>
                    </div>
                    </ScrollAnimation>
                    <ScrollAnimation animation="fade-up" delay={200}>
                    <button className="flex w-fit cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-8 bg-primary text-slate-900 text-base font-bold transition-transform hover:scale-105 active:scale-95 shadow-md max-[680px]:mx-auto">
                        <span className="truncate dark:text-slate-100">{t('requirements.hero.button')}</span>
                    </button>
                    </ScrollAnimation>
                </div>
                <div className="w-full lg:w-auto lg:flex-1">
                    <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl shadow-lg border border-primary/10" data-alt="Close up of a blood donation procedure with soft lighting" style={{backgroundImage: "url('/assets/pages/requirements/hero-image-requirements.png')"}}></div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default HeroSection