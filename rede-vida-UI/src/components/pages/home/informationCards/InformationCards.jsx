import { useTranslation } from 'react-i18next'

function InformationCards() {
  const { t } = useTranslation()
  return (
    <section className="w-full bg-white dark:bg-background-dark py-20 px-6 lg:px-40">
        <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-[#1b0e10] dark:text-white mb-4">{t('home.informationCards.title')}</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('home.informationCards.subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group p-8 bg-background-light dark:bg-background-dark border border-gray-100 dark:border-gray-800 rounded-2xl hover:border-primary/30 transition-all hover:shadow-xl hover:-translate-y-1">
                    <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-3xl">{t('home.informationCards.requirements.icon')}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#1b0e10] dark:text-white mb-3">{t('home.informationCards.requirements.title')}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">{t('home.informationCards.requirements.description')}</p>
                    <a className="text-primary text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all" href="#">{t('home.informationCards.requirements.link')} <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
                </div>
                <div className="group p-8 bg-background-light dark:bg-background-dark border border-gray-100 dark:border-gray-800 rounded-2xl hover:border-primary/30 transition-all hover:shadow-xl hover:-translate-y-1">
                    <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-3xl">{t('home.informationCards.appointment.icon')}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#1b0e10] dark:text-white mb-3">{t('home.informationCards.appointment.title')}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">{t('home.informationCards.appointment.description')}</p>
                    <a className="text-primary text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all" href="#">{t('home.informationCards.appointment.link')} <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
                </div>
                <div className="group p-8 bg-background-light dark:bg-background-dark border border-gray-100 dark:border-gray-800 rounded-2xl hover:border-primary/30 transition-all hover:shadow-xl hover:-translate-y-1">
                    <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-3xl">{t('home.informationCards.contact.icon')}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#1b0e10] dark:text-white mb-3">{t('home.informationCards.contact.title')}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">{t('home.informationCards.contact.description')}</p>
                    <a className="text-primary text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all" href="#">{t('home.informationCards.contact.link')} <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
                </div>
            </div>
        </div>
    </section>
  )
}

export default InformationCards