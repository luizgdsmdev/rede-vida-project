import ScrollAnimation from '../../../shared/ScrollAnimation/ScrollAnimation'
import {useTranslation} from 'react-i18next'

function ImpedimentsSection() {
  const {t} = useTranslation()
  return (
    <section className="w-full bg-light dark:bg-background-dark py-12 px-6 pt-20 pb-20 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
            <ScrollAnimation animation="fade-up" delay={100}>
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-[#1b0e10] dark:text-white mb-4">{t('requirements.impediments.title')}</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('requirements.impediments.description')}</p>
                </div>
            </ScrollAnimation>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                <ScrollAnimation animation="fade-up" delay={200}>
                    <div className="flex flex-col gap-6 h-full">
                        <div className="flex items-center gap-3">
                            <ScrollAnimation animation="fade-up" delay={300}>
                                <div className="size-14 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                    <span className="material-symbols-outlined text-3xl">{t('requirements.impediments.temporariesIcon')}</span>
                                </div>
                            </ScrollAnimation>
                            <ScrollAnimation animation="fade-up" delay={400}>
                                <h2 className="text-[#1b0e10] dark:text-white text-2xl font-bold">{t('requirements.impediments.temporariesTitle')}</h2>
                            </ScrollAnimation>
                        </div>
                        <div className="space-y-4 flex-1">
                            <ScrollAnimation animation="fade-up" delay={500}>
                                <div className="group p-6 bg-background-light dark:bg-background-dark border-2 border-amber-500/20 rounded-2xl hover:border-amber-500 transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col justify-center">
                                    <div className="font-bold text-[#1b0e10] dark:text-white mb-2">{t('requirements.impediments.temporaries.gripeResfriado')}</div>
                                    <div className="text-gray-600 dark:text-gray-400">{t('requirements.impediments.temporaries.gripeResfriadoDescription')}</div>
                                </div>
                            </ScrollAnimation>
                            <ScrollAnimation animation="fade-up" delay={600}>
                            <div className="group p-6 bg-background-light dark:bg-background-dark border-2 border-amber-500/20 rounded-2xl hover:border-amber-500 transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col justify-center">
                                <div className="font-bold text-[#1b0e10] dark:text-white mb-2">{t('requirements.impediments.temporaries.gravidez')}</div>
                                <div className="text-gray-600 dark:text-gray-400">{t('requirements.impediments.temporaries.gravidezDescription')}</div>
                            </div>
                            </ScrollAnimation>
                            <ScrollAnimation animation="fade-up" delay={700}>
                            <div className="group p-6 bg-background-light dark:bg-background-dark border-2 border-amber-500/20 rounded-2xl hover:border-amber-500 transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col justify-center">
                                <div className="font-bold text-[#1b0e10] dark:text-white mb-2">{t('requirements.impediments.temporaries.tatuagem')}</div>
                                <div className="text-gray-600 dark:text-gray-400">{t('requirements.impediments.temporaries.tatuagemDescription')}</div>
                            </div>
                            </ScrollAnimation>
                            <ScrollAnimation animation="fade-up" delay={800}>
                            <div className="group p-6 bg-background-light dark:bg-background-dark border-2 border-amber-500/20 rounded-2xl hover:border-amber-500 transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col justify-center">
                                <div className="font-bold text-[#1b0e10] dark:text-white mb-2">{t('requirements.impediments.temporaries.ingestaoAlcoolica')}</div>
                                <div className="text-gray-600 dark:text-gray-400">{t('requirements.impediments.temporaries.ingestaoAlcoolicaDescription')}</div>
                            </div>
                            </ScrollAnimation>
                        </div>
                    </div>
                </ScrollAnimation>
                <ScrollAnimation animation="fade-up" delay={300}>
                    <div className="flex flex-col gap-6 h-full">
                        <ScrollAnimation animation="fade-up" delay={400}>
                        <div className="flex items-center gap-3">
                            <div className="size-14 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                                <span className="material-symbols-outlined text-3xl">{t('requirements.impediments.definitivesIcon')}</span>
                            </div>
                            <h2 className="text-[#1b0e10] dark:text-white text-2xl font-bold">{t('requirements.impediments.definitivesTitle')}</h2>
                        </div>
                        </ScrollAnimation>

                        <div className="space-y-4 flex-1">
                            <ScrollAnimation animation="fade-up" delay={500}>
                                <div className="group p-6 bg-background-light dark:bg-background-dark border-2 border-red-500/20 rounded-2xl hover:border-red-500 transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col justify-center">
                                    <div className="font-bold text-[#1b0e10] dark:text-white mb-2">{t('requirements.impediments.definitives.hepatite')}</div>
                                    <div className="text-gray-600 dark:text-gray-400">{t('requirements.impediments.definitives.hepatiteDescription')}</div>
                                </div>
                            </ScrollAnimation>

                            <ScrollAnimation animation="fade-up" delay={600}>
                                <div className="group p-6 bg-background-light dark:bg-background-dark border-2 border-red-500/20 rounded-2xl hover:border-red-500 transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col justify-center">
                                    <div className="font-bold text-[#1b0e10] dark:text-white mb-2">{t('requirements.impediments.definitives.diseases')}</div>
                                    <div className="text-gray-600 dark:text-gray-400">{t('requirements.impediments.definitives.diseasesDescription')}</div>
                                </div>
                            </ScrollAnimation>

                            <ScrollAnimation animation="fade-up" delay={700}>
                                <div className="group p-6 bg-background-light dark:bg-background-dark border-2 border-red-500/20 rounded-2xl hover:border-red-500 transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col justify-center">
                                    <div className="font-bold text-[#1b0e10] dark:text-white mb-2">{t('requirements.impediments.definitives.cardiopatia')}</div>
                                    <div className="text-gray-600 dark:text-gray-400">{t('requirements.impediments.definitives.cardiopatiaDescription')}</div>
                                </div>
                            </ScrollAnimation>
                            <ScrollAnimation animation="fade-up" delay={800}>
                                <div className="group p-6 bg-background-light dark:bg-background-dark border-2 border-red-500/20 rounded-2xl hover:border-red-500 transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col justify-center">
                                    <div className="font-bold text-[#1b0e10] dark:text-white mb-2">{t('requirements.impediments.definitives.drogas')}</div>
                                    <div className="text-gray-600 dark:text-gray-400">{t('requirements.impediments.definitives.drogasDescription')}</div>
                                </div>
                            </ScrollAnimation>
                        </div>
                    </div>
                </ScrollAnimation>
            </div>
        </div>
    </section>
  )
}

export default ImpedimentsSection
