import React from 'react'
import { useTranslation } from 'react-i18next'
import ScrollAnimation from '../../../shared/ScrollAnimation/ScrollAnimation'

function PreparationSection() {
  const { t } = useTranslation()
  return (
    <section className="w-full bg-white dark:bg-background-dark-2 py-8 px-6 pt-20 pb-20 md:px-10 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
            <ScrollAnimation animation="fade-up" delay={100}>
                <div className="bg-primary/10 rounded-2xl p-8 my-10 border border-primary/20">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-[#1b0e10] dark:text-white mb-4">{t('requirements.preparation.title')}</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('requirements.preparation.description')}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ScrollAnimation animation="fade-up" delay={200}>
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-white dark:bg-background-dark rounded-full text-primary shadow-sm flex-shrink-0 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-2xl">water_drop</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1b0e10] dark:text-white">{t('requirements.preparation.hydration.title')}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('requirements.preparation.hydration.description')}</p>
                                </div>
                            </div>
                        </ScrollAnimation>
                        <ScrollAnimation animation="fade-up" delay={300}>
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-white dark:bg-background-dark rounded-full text-primary shadow-sm flex-shrink-0 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-2xl">restaurant</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1b0e10] dark:text-white">{t('requirements.preparation.noFasting.title')}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('requirements.preparation.noFasting.description')}</p>
                                </div>
                            </div>
                        </ScrollAnimation>
                        <ScrollAnimation animation="fade-up" delay={400}>
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-white dark:bg-background-dark rounded-full text-primary shadow-sm flex-shrink-0 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-2xl">no_food</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1b0e10] dark:text-white">{t('requirements.preparation.avoidFats.title')}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('requirements.preparation.avoidFats.description')}</p>
                                </div>
                            </div>
                        </ScrollAnimation>
                        <ScrollAnimation animation="fade-up" delay={500}>
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-white dark:bg-background-dark rounded-full text-primary shadow-sm flex-shrink-0 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-2xl">bedtime</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1b0e10] dark:text-white">{t('requirements.preparation.sleep.title')}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('requirements.preparation.sleep.description')}</p>
                                </div>
                            </div>
                        </ScrollAnimation>
                    </div>
                </div>
            </ScrollAnimation>
        </div>
    </section>
  )
}

export default PreparationSection