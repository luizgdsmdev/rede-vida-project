import { useTranslation } from 'react-i18next';
import ScrollAnimation from '../../../shared/ScrollAnimation/ScrollAnimation';

function HeroSection() {
  const { t } = useTranslation();
  return (
    <section className="bg-background-light dark:bg-background-dark-2 relative py-16 pt-8 lg:py-24 overflow-hidden min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 lg:space-y-6 max-md:text-center max-md:flex max-md:flex-col max-md:items-center max-md:justify-center">
                    <h1 className="text-4xl lg:text-6xl font-black text-[#1b0e10] dark:text-white leading-tight">{t('contact.hero.title')}</h1>
                    <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-lg lg:max-w-lg max-md:w-full">{t('contact.hero.subtitle')}</p>
                    <div className="flex gap-4 max-md:justify-center">
                        <a className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-bold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all" href="#contact-form">{t('contact.hero.ctaButton')}</a>
                    </div>
                </div>
                <div className="relative lg:px-8">
                <div className="w-full aspect-video rounded-xl bg-cover bg-center shadow-2xl" data-alt="Equipe de atendimento ao cliente sorrindo e trabalhando" style={{ backgroundImage: "url('/assets/pages/contact/contact-hero-image.png')" }}></div>
                    <div className="absolute -bottom-4 sm:-bottom-6 lg:-bottom-6 left-4 sm:left-6 lg:-left-6 bg-white dark:bg-background-dark p-4 sm:p-6 rounded-xl shadow-xl flex items-center gap-3 sm:gap-4 border border-primary/10 max-w-[280px] sm:max-w-none">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                            <span className="material-symbols-outlined text-lg sm:text-xl">volunteer_activism</span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-bold text-[#1b0e10] dark:text-white">{t('contact.hero.card.title')}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{t('contact.hero.card.subtitle')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default HeroSection