import { useTranslation } from 'react-i18next'
function IinputWhereDonate() {
  const { t } = useTranslation()
  return (
    <div className="flex items-stretch rounded-xl h-14 md:h-16 bg-[#f3e7e9] dark:bg-[#3d2a2d] shadow-sm border-2 border-transparent focus-within:border-[3px] focus-within:border-primary focus-within:shadow-[0_0_0_1px_rgba(249,115,22,0.1)] transition-all w-full">
        <div className="text-primary flex items-center justify-center pl-4 flex-shrink-0">
            <span className="material-symbols-outlined">location_on</span>
        </div>
        <input className="flex-1 bg-transparent border-none text-[#1b0e10] dark:text-white focus:ring-0 focus:outline-none placeholder:text-gray-500 text-base px-3 min-w-0" placeholder={t('home.hero.inputPlaceholder')}/>
        <div className="flex items-center p-2 flex-shrink-0">
            <button className="bg-primary text-white h-full px-4 sm:px-6 rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center gap-2 whitespace-nowrap">
                <span className="material-symbols-outlined text-sm">search</span>
                <span className="hidden sm:inline">{t('home.hero.searchButton')}</span>
            </button>
        </div>
    </div>
  )
}

export default IinputWhereDonate