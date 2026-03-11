import { useTranslation } from 'react-i18next'
import ScrollAnimation from '../../../shared/ScrollAnimation/ScrollAnimation'

function ValuesSection() {
  const { t } = useTranslation()
  return (
    <section className="w-full bg-white dark:bg-background-dark-2 py-20 px-6 md:px-20 lg:px-12">
        <ScrollAnimation animation="fade-up" delay={100}>
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">{t('about.values.title')}</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </div>
        </ScrollAnimation>
        <div className="grid md:grid-cols-3 gap-8">
            <ScrollAnimation animation="fade-up" delay={200}>
            <div className="group bg-background-light dark:bg-background-dark p-8 rounded-xl shadow-sm border-2 border-primary/20 flex flex-col items-center text-center hover:border-primary transition-all hover:shadow-xl hover:-translate-y-1">
                <ScrollAnimation animation="fade-up" delay={200}>
                <div className="size-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-3xl">visibility</span>
                </div>
                </ScrollAnimation>

                <ScrollAnimation animation="fade-up" delay={300}>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">{t('about.values.transparency.title')}</h3>
                <p className="text-slate-600 dark:text-slate-400">{t('about.values.transparency.description')}</p>
                </ScrollAnimation>
            </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-up" delay={300}>
                <div className="group bg-background-light dark:bg-background-dark p-8 rounded-xl shadow-sm border-2 border-primary/20 flex flex-col items-center text-center hover:border-primary transition-all hover:shadow-xl hover:-translate-y-1">
                    <ScrollAnimation animation="fade-up" delay={400}>
                    <div className="size-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-3xl">favorite</span>
                    </div>
                    </ScrollAnimation>
                    <ScrollAnimation animation="fade-up" delay={500}>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">{t('about.values.humanity.title')}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{t('about.values.humanity.description')}</p>
                    </ScrollAnimation>
                </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-up" delay={600}>
            <div className="group bg-background-light dark:bg-background-dark p-8 rounded-xl shadow-sm border-2 border-primary/20 flex flex-col items-center text-center hover:border-primary transition-all hover:shadow-xl hover:-translate-y-1">
                <ScrollAnimation animation="fade-up" delay={600}>
                <div className="size-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-3xl">lightbulb</span>
                </div>
                </ScrollAnimation>
                <ScrollAnimation animation="fade-up" delay={700}>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">{t('about.values.innovation.title')}</h3>
                <p className="text-slate-600 dark:text-slate-400">{t('about.values.innovation.description')}</p>
                </ScrollAnimation>
            </div>
            </ScrollAnimation>
        </div>
    </section>
  )
}

export default ValuesSection