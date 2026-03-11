import ScrollAnimation from '../../../shared/ScrollAnimation/ScrollAnimation';
import { useTranslation } from 'react-i18next';

function PageSearch() {
  const { t } = useTranslation();
  
  return (
    <section className="w-full bg-background-light dark:bg-background-dark-2 py-16 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimation animation="fade-up" delay={100}>
                <div className="flex flex-col gap-2 mb-10">
                    <h2 className="text-[#1b0e10] dark:text-white text-3xl font-bold tracking-tight">{t('location.hero.title')}</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl">{t('location.hero.description')}</p>
                </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-up" delay={200}>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
                        <div className="flex items-stretch rounded-lg h-12 bg-white dark:bg-[#3d2a2d] border-2 border-transparent focus-within:border-[3px] focus-within:border-primary focus-within:shadow-[0_0_0_1px_rgba(249,115,22,0.1)] transition-all w-full">
                            <input className="flex-1 bg-transparent border-none text-[#1b0e10] dark:text-white focus:ring-0 focus:outline-none placeholder:text-gray-500 text-sm pl-12 pr-4 min-w-0" placeholder={t('location.searchPlaceholder')} type="text"/>
                        </div>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        <button className="whitespace-nowrap px-6 py-3 rounded-lg bg-primary text-white font-semibold flex items-center gap-2 hover:bg-primary/90 transition-colors">
                            <span className="material-symbols-outlined text-sm">filter_list</span>
                            {t('location.filters.all')}
                        </button>
                        <button className="whitespace-nowrap px-6 py-3 rounded-lg bg-white dark:bg-[#3d2a2d] text-[#1b0e10] dark:text-white font-semibold hover:bg-primary/5 transition-colors flex items-center gap-2 border-2 border-transparent hover:border-primary/20">
                            <span className="material-symbols-outlined text-sm">location_on</span>
                            {t('location.filters.fixed')}
                        </button>
                        <button className="whitespace-nowrap px-6 py-3 rounded-lg bg-white dark:bg-[#3d2a2d] text-[#1b0e10] dark:text-white font-semibold hover:bg-primary/5 transition-colors flex items-center gap-2 border-2 border-transparent hover:border-primary/20">
                            <span className="material-symbols-outlined text-sm">local_shipping</span>
                            {t('location.filters.mobile')}
                        </button>
                    </div>
                </div>
            </ScrollAnimation>
        </div>
    </section>
  )
}

export default PageSearch