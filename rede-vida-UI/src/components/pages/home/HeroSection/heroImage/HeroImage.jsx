import { useTranslation } from 'react-i18next';

function HeroImage() {
  const { t } = useTranslation();
  return (
    <div className="w-full lg:w-5/12 xl:w-4/12 lg:pl-4">
        <div className="relative w-full aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"></div>
            <img alt="Professional healthcare worker preparing blood donation" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Healthcare worker preparing equipment for blood donation" src="/assets/pages/home/hero-home-image.avif"/>
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 dark:bg-background-dark/90 backdrop-blur rounded-xl border border-white/20 shadow-xl">
                <div className="flex items-center gap-3">
                    <div className="size-8 sm:size-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                        <span className="material-symbols-outlined text-sm sm:text-base">verified</span>
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-bold text-[#1b0e10] dark:text-white truncate">{t('home.hero.heroImage.title')}</p>
                        <p className="text-xs text-gray-500 truncate">{t('home.hero.heroImage.subtitle')}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroImage