import { useTranslation } from 'react-i18next';
import ScrollAnimation from '../../../shared/ScrollAnimation/ScrollAnimation';

const SideListLocations = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full bg-background-light dark:bg-background-dark-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-1 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 h-full min-h-[600px]">
        <div className="md:col-span-2 lg:col-span-4 flex flex-col gap-4 overflow-y-auto scrollbar-transparent max-h-[800px] pr-2 overflow-y-auto scrollbar scrollbar-thumb-gray-400 scrollbar-track-transparent">
            <ScrollAnimation animation="fade-up" delay={300}>
                <div className="bg-background-light dark:bg-background-dark-2 p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-[#3d2a2d] shadow-sm hover:border-primary/40 transition-colors relative group">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-base sm:text-lg leading-tight text-[#1b0e10] dark:text-white flex-1 pr-2">{t('location.filters.hemocentroCentral')}</h3>
                            <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 font-bold flex-shrink-0">{t('location.filters.open')}</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">pin_drop</span>
                            {t('location.filters.hemocentroCentralAddress')}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm font-bold text-primary">0.8 km</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{t('location.filters.hemocentroCentralHours')}</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                            <button className="flex-1 bg-primary text-white py-2 sm:py-2.5 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">{t('location.filters.schedule')}</button>
                            <button className="w-10 sm:w-12 border border-gray-200 dark:border-[#3d2a2d] text-gray-400 rounded-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-[#3d2a2d] transition-colors">
                            <span className="material-symbols-outlined text-sm sm:text-base">visibility</span>
                            </button>
                        </div>
                    </div>
                </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-up" delay={400}>
            <div className="bg-background-light dark:bg-background-dark-2 p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-[#3d2a2d] shadow-sm hover:border-primary/40 transition-colors">
                <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-base sm:text-lg leading-tight text-[#1b0e10] dark:text-white flex-1 pr-2">{t('location.filters.hemocentroCentral')}</h3>
                    <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 font-bold flex-shrink-0">{t('location.filters.open')}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">pin_drop</span>
                    {t('location.filters.hemocentroCentralAddress')}
                </p>
                <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm font-bold text-primary">3.2 km</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{t('location.filters.hemocentroCentralHours')}</span>
                </div>
                <div className="flex gap-2 mt-3">
                    <button className="flex-1 bg-primary text-white py-2 sm:py-2.5 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">{t('location.filters.schedule')}</button>
                    <button className="w-10 sm:w-12 border border-gray-200 dark:border-[#3d2a2d] text-gray-400 rounded-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-[#3d2a2d] transition-colors">
                    <span className="material-symbols-outlined text-sm sm:text-base">visibility</span>
                    </button>
                </div>
                </div>
            </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-up" delay={500}>
            <div className="bg-background-light dark:bg-background-dark-2 p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-[#3d2a2d] shadow-sm hover:border-primary/40 transition-colors">
                <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col flex-1 pr-2">
                    <h3 className="font-bold text-base sm:text-lg leading-tight text-[#1b0e10] dark:text-white">{t('location.filters.mobileUnit')}</h3>
                    <span className="text-[10px] text-primary font-bold flex items-center gap-1 uppercase tracking-wider mt-1">
                        <span className="material-symbols-outlined text-[12px]">local_shipping</span> {t('location.filters.mobileUnit')}
                    </span>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-orange-100 text-orange-700 font-bold flex-shrink-0">{t('location.filters.closed')}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-sm">pin_drop</span>
                    {t('location.filters.hemocentroCentralAddress')}
                </p>
                <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm font-bold text-primary">5.5 km</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 italic">{t('location.filters.mobileUnitReturn')}</span>
                </div>
                <div className="flex gap-2 mt-3">
                    <button className="flex-1 bg-gray-200 dark:bg-[#3d2a2d] text-gray-400 py-2 sm:py-2.5 rounded-lg text-sm font-bold cursor-not-allowed" disabled>{t('location.filters.schedule')}</button>
                    <button className="w-10 sm:w-12 border border-gray-200 dark:border-[#3d2a2d] text-gray-400 rounded-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-[#3d2a2d] transition-colors">
                    <span className="material-symbols-outlined text-sm sm:text-base">visibility</span>
                    </button>
                </div>
                </div>
            </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-up" delay={600}>
            <div className="bg-background-light dark:bg-background-dark-2 p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-[#3d2a2d] shadow-sm hover:border-primary/40 transition-colors">
                <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-base sm:text-lg leading-tight text-[#1b0e10] dark:text-white flex-1 pr-2">{t('location.filters.mobileUnit')}</h3>
                    <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 font-bold flex-shrink-0">{t('location.filters.open')}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">pin_drop</span>
                    {t('location.filters.hemocentroCentralAddress')}
                </p>
                <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm font-bold text-primary">1.2 km</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{t('location.filters.hemocentroCentralHours')}</span>
                </div>
                <div className="flex gap-2 mt-3">
                    <button className="flex-1 bg-primary text-white py-2 sm:py-2.5 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">{t('location.filters.schedule')}</button>
                    <button className="w-10 sm:w-12 border border-gray-200 dark:border-[#3d2a2d] text-gray-400 rounded-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-[#3d2a2d] transition-colors">
                    <span className="material-symbols-outlined text-sm sm:text-base">visibility</span>
                    </button>
                </div>
                </div>
            </div>
            </ScrollAnimation>
        </div>
        <div className="md:col-span-2 lg:col-span-8 relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-[#3d2a2d] min-h-[400px] sm:min-h-[500px]">
          <div className="absolute inset-0 bg-gray-200 dark:bg-[#3d2a2d] flex items-center justify-center" data-alt="Interactive city map with multiple location pins" data-location="São Paulo" style={{
            backgroundImage: "url('/assets/pages/location/hero-image-location.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>

            <div className="absolute top-1/4 left-1/3">
              <div className="relative group cursor-pointer">
                <div className="bg-primary p-2 rounded-full text-white shadow-lg transform group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-lg">water_drop</span>
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-primary/20 dark:bg-background-dark-2/20 p-2 rounded shadow-xl text-xs font-bold whitespace-nowrap hidden group-hover:block">
                  Hemocentro Central
                  <div className="absolute bottom-full left-1/2 border-4 border-transparent border-t-white dark:border-t-background-dark-2"></div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-1/3 right-1/4">
              <div className="relative group cursor-pointer">
                <div className="bg-primary p-2 rounded-full text-white shadow-lg transform group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-lg">water_drop</span>
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-primary/20 dark:bg-background-dark-2/20 p-2 rounded shadow-xl text-xs font-bold whitespace-nowrap hidden group-hover:block">
                  Dante Pazzanese
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white dark:border-t-background-dark-2"></div>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-2/3">
              <div className="relative group cursor-pointer">
                <div className="bg-gray-500 p-2 rounded-full text-white shadow-lg transform group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-lg">local_shipping</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 dark:bg-background-dark-2/20 rounded-lg shadow-md flex items-center justify-center hover:bg-primary/30 dark:hover:bg-background-dark-2/30 transition-colors">
              <span className="material-symbols-outlined text-lg sm:text-xl">add</span>
            </button>
            <button className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 dark:bg-background-dark-2/20 rounded-lg shadow-md flex items-center justify-center hover:bg-primary/30 dark:hover:bg-background-dark-2/30 transition-colors">
              <span className="material-symbols-outlined text-lg sm:text-xl">remove</span>
            </button>
          </div>
          {/* <div className="absolute bottom-8 left-6 right-6">
            <div className="bg-background-light dark:bg-background-dark-2/90 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-lg border border-white/20">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 bg-primary/20 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-primary">info</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Mostrando <strong>12 locais</strong> em São Paulo. Unidades móveis podem ter horários de funcionamento reduzidos ou ser exclusivas para campanhas específicas.
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default SideListLocations