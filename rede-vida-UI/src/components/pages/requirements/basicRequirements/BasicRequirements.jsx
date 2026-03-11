import { useTranslation } from 'react-i18next'
import ScrollAnimation from '../../../shared/ScrollAnimation/ScrollAnimation'

function BasicRequirements() {
  const { t } = useTranslation()
  return (
    <section className="w-full bg-white dark:bg-background-dark-2 py-12 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
            <ScrollAnimation animation="fade-up" delay={100}>
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-[#1b0e10] dark:text-white mb-4">{t('requirements.basicRequirements.title')}</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('requirements.basicRequirements.description')}</p>
                </div>
            </ScrollAnimation>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <ScrollAnimation animation="fade-up" delay={100}>
                    <div className="group h-full p-8 bg-background-light dark:bg-background-dark border-2 border-primary/20 rounded-2xl hover:border-primary transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col">
                        <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-3xl">calendar_today</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#1b0e10] dark:text-white mb-3">{t('requirements.basicRequirements.age.title')}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{t('requirements.basicRequirements.age.description')}</p>
                    </div>
                </ScrollAnimation>
                <ScrollAnimation animation="fade-up" delay={200}>
                    <div className="group h-full p-8 bg-background-light dark:bg-background-dark border-2 border-primary/20 rounded-2xl hover:border-primary transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col">
                        <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-3xl">monitor_weight</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#1b0e10] dark:text-white mb-3">{t('requirements.basicRequirements.weight.title')}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{t('requirements.basicRequirements.weight.description')}</p>
                    </div>
                </ScrollAnimation>
                <ScrollAnimation animation="fade-up" delay={300}>
                    <div className="group h-full p-8 bg-background-light dark:bg-background-dark border-2 border-primary/20 rounded-2xl hover:border-primary transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col">
                        <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-3xl">health_and_safety</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#1b0e10] dark:text-white mb-3">{t('requirements.basicRequirements.health.title')}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{t('requirements.basicRequirements.health.description')}</p>
                    </div>
                </ScrollAnimation>
                <ScrollAnimation animation="fade-up" delay={400}>
                    <div className="group h-full p-8 bg-background-light dark:bg-background-dark border-2 border-primary/20 rounded-2xl hover:border-primary transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col">
                        <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-3xl">badge</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#1b0e10] dark:text-white mb-3">{t('requirements.basicRequirements.document.title')}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{t('requirements.basicRequirements.document.description')}</p>
                    </div>
                </ScrollAnimation>
            </div>
        </div>
    </section>
  )
}

export default BasicRequirements;