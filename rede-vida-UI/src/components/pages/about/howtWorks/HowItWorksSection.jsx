import { useTranslation } from 'react-i18next'
import ScrollAnimation from '../../../shared/ScrollAnimation/ScrollAnimation'

function HowItWorksSection() {
  const { t } = useTranslation()
  return (
    <section className="w-full bg-white dark:bg-background-dark px-6 py-20 md:px-20 lg:px-12 text-center">
        <ScrollAnimation animation="fade-up" delay={100}>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-12">{t('about.howtWorks.title')}</h2>
        </ScrollAnimation>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
            <ScrollAnimation animation="fade-up" delay={200}>
                <div className="flex flex-col items-center gap-4">
                    <div className="size-12 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-lg font-bold border-2 border-primary text-primary">1</div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('about.howtWorks.step1')}</p>
                </div>
            </ScrollAnimation>

            <div className="hidden md:flex h-0.5 w-full bg-primary/20 max-w-24"></div>
            <ScrollAnimation animation="fade-up" delay={300}>
                <div className="flex flex-col items-center gap-4">
                    <div className="size-12 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-lg font-bold border-2 border-primary text-primary">2</div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('about.howtWorks.step2')}</p>
                </div>
            </ScrollAnimation>
            <div className="hidden md:flex h-0.5 w-full bg-primary/20 max-w-24"></div>
            <ScrollAnimation animation="fade-up" delay={400}>
                <div className="flex flex-col items-center gap-4">
                    <div className="size-12 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-lg font-bold border-2 border-primary text-primary">3</div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('about.howtWorks.step3')}</p>
                </div>
            </ScrollAnimation>
            <div className="hidden md:flex h-0.5 w-full bg-primary/20 max-w-24"></div>
            <ScrollAnimation animation="fade-up" delay={500}>
                <div className="flex flex-col items-center gap-4">
                    <div className="size-12 rounded-full bg-primary flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-primary/40">4</div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('about.howtWorks.step4')}</p>
                </div>
            </ScrollAnimation>
        </div>
        <ScrollAnimation animation="fade-up" delay={600}>
            <div className="mt-16">
                <button className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">{t('about.howtWorks.button')}</button>
            </div>
        </ScrollAnimation>

    </section>
  )
}

export default HowItWorksSection;