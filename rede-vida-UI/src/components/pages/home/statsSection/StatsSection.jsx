import ScrollAnimation from '../../../shared/ScrollAnimation/ScrollAnimation'
import {useTranslation} from 'react-i18next'

function StatsSection() {
  const {t} = useTranslation()
  return (
    <section className="w-full bg-white dark:bg-background-dark py-12 pt-1 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-11">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <ScrollAnimation animation="fade-up" delay={100}>
                    <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#e7d0d4] dark:border-[#3d2a2d] bg-[#fcf8f9] dark:bg-background-dark/50">
                        <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-primary">{t('home.hero.statsSection.livesSavedIcon')}</span>
                        <p className="text-[#1b0e10] dark:text-gray-300 text-sm font-medium">{t('home.hero.statsSection.livesSaved')}</p>
                        </div>
                        <p className="text-primary text-3xl font-black leading-tight text-center" >{t('home.hero.statsSection.livesSavedValue')}</p>
                        <p className="text-green-600 text-sm font-bold text-center">{t('home.hero.statsSection.livesSavedPercentage')}</p>
                    </div>
                </ScrollAnimation>
                <ScrollAnimation animation="fade-up" delay={200}>
                    <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#e7d0d4] dark:border-[#3d2a2d] bg-[#fcf8f9] dark:bg-background-dark/50">
                        <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-primary">{t('home.hero.statsSection.activeDonorsIcon')}</span>
                        <p className="text-[#1b0e10] dark:text-gray-300 text-sm font-medium">{t('home.hero.statsSection.activeDonors')}</p>
                        </div>
                        <p className="text-[#1b0e10] dark:text-white text-3xl font-black leading-tight text-center">{t('home.hero.statsSection.activeDonorsValue')}</p>
                        <p className="text-gray-500 text-sm font-medium text-center">{t('home.hero.statsSection.activeDonorsPercentage')}</p>
                    </div>
                </ScrollAnimation>
                <ScrollAnimation animation="fade-up" delay={300}>
                    <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#e7d0d4] dark:border-[#3d2a2d] bg-[#fcf8f9] dark:bg-background-dark/50">
                        <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-primary">{t('home.hero.statsSection.bloodCentersIcon')}</span>
                        <p className="text-[#1b0e10] dark:text-gray-300 text-sm font-medium">{t('home.hero.statsSection.bloodCenters')}</p>
                        </div>
                        <p className="text-[#1b0e10] dark:text-white text-3xl font-black leading-tight text-center">{t('home.hero.statsSection.bloodCentersValue')}</p>
                        <p className="text-gray-500 text-sm font-medium text-center">{t('home.hero.statsSection.bloodCentersPercentage')}</p>
                    </div>
                </ScrollAnimation>
                <ScrollAnimation animation="fade-up" delay={400}>
                    <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#e7d0d4] dark:border-[#3d2a2d] bg-[#fcf8f9] dark:bg-background-dark/50">
                        <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-primary">{t('home.hero.statsSection.appointmentsIcon')}</span>
                        <p className="text-[#1b0e10] dark:text-gray-300 text-sm font-medium">{t('home.hero.statsSection.appointments')}</p>
                        </div>
                        <p className="text-[#1b0e10] dark:text-white text-3xl font-black leading-tight text-center">{t('home.hero.statsSection.appointmentsValue')}</p>
                        <p className="text-primary text-sm font-bold text-center">{t('home.hero.statsSection.appointmentsPercentage')}</p>
                    </div>
                </ScrollAnimation>
            </div>
        </div>
    </section>
  )
}

export default StatsSection