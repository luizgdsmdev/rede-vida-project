import ScrollAnimation from '../../../shared/ScrollAnimation/ScrollAnimation'
import { useTranslation } from 'react-i18next'

function Step2Donate() {
  const { t } = useTranslation()
  return (
    <section className="w-full bg-white dark:bg-background-dark px-4 pt-0 sm:px-6 lg:px-0 py-0 md:py-0">
      <div className="max-w-7xl mx-auto pt-0">
        <div className="bg-white dark:bg-background-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <form className="p-8 space-y-8">
            <div className="space-y-6">
              <h3 className="text-lg font-bold border-b border-gray-200 dark:border-gray-700 pb-2 text-primary">{t('donateNow.step2.title')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-gray-900 dark:text-white text-base font-medium">{t('donateNow.step2.fullName')}</span>
                    <div className="flex items-stretch rounded-lg h-14 bg-white dark:bg-[#3d2a2d] border-2 border-transparent focus-within:border-[3px] focus-within:border-primary focus-within:shadow-[0_0_0_1px_rgba(249,115,22,0.1)] transition-all w-full">
                      <input className="flex-1 bg-transparent border-none text-[#1b0e10] dark:text-white focus:ring-0 focus:outline-none placeholder:text-gray-500 text-base px-4 min-w-0" placeholder={t('donateNow.step2.fullNamePlaceholder')} type="text"/>
                    </div>
                  </label>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-900 dark:text-white text-base font-medium">{t('donateNow.step2.email')}</label>
                  <div className="flex items-stretch rounded-lg h-14 bg-white dark:bg-[#3d2a2d] border-2 border-transparent focus-within:border-[3px] focus-within:border-primary focus-within:shadow-[0_0_0_1px_rgba(249,115,22,0.1)] transition-all w-full">
                    <div className="text-primary flex items-center justify-center pl-4 flex-shrink-0">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <input className="flex-1 bg-transparent border-none text-[#1b0e10] dark:text-white focus:ring-0 focus:outline-none placeholder:text-gray-500 text-base px-3 min-w-0" placeholder={t('donateNow.step2.emailPlaceholder')} type="email"/>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-900 dark:text-white text-base font-medium">{t('donateNow.step2.phone')}</label>
                  <div className="flex items-stretch rounded-lg h-14 bg-white dark:bg-[#3d2a2d] border-2 border-transparent focus-within:border-[3px] focus-within:border-primary focus-within:shadow-[0_0_0_1px_rgba(249,115,22,0.1)] transition-all w-full">
                    <div className="text-primary flex items-center justify-center pl-4 flex-shrink-0">
                      <span className="material-symbols-outlined">call</span>
                    </div>
                    <input className="flex-1 bg-transparent border-none text-[#1b0e10] dark:text-white focus:ring-0 focus:outline-none placeholder:text-gray-500 text-base px-3 min-w-0" placeholder={t('donateNow.step2.phonePlaceholder')} type="tel"/>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-900 dark:text-white text-base font-medium">{t('donateNow.step2.cpf')}</label>
                  <div className="flex items-stretch rounded-lg h-14 bg-white dark:bg-[#3d2a2d] border-2 border-transparent focus-within:border-[3px] focus-within:border-primary focus-within:shadow-[0_0_0_1px_rgba(249,115,22,0.1)] transition-all w-full">
                    <input className="flex-1 bg-transparent border-none text-[#1b0e10] dark:text-white focus:ring-0 focus:outline-none placeholder:text-gray-500 text-base px-4 min-w-0" placeholder={t('donateNow.step2.cpfPlaceholder')} type="text"/>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-900 dark:text-white text-base font-medium">{t('donateNow.step2.birthDate')}</label>
                  <div className="flex items-stretch rounded-lg h-14 bg-white dark:bg-[#3d2a2d] border-2 border-transparent focus-within:border-[3px] focus-within:border-primary focus-within:shadow-[0_0_0_1px_rgba(249,115,22,0.1)] transition-all w-full">
                    <input className="flex-1 bg-transparent border-none text-[#1b0e10] dark:text-white focus:ring-0 focus:outline-none placeholder:text-gray-500 text-base px-4 min-w-0" placeholder={t('donateNow.step2.birthDatePlaceholder')} type="date"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-lg font-bold border-b border-gray-200 dark:border-gray-700 pb-2 text-primary">{t('donateNow.step2.address')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <label className="flex flex-col gap-2">
                    <span className="text-gray-900 dark:text-white text-base font-medium">{t('donateNow.step2.cep')}</span>
                    <div className="flex items-stretch rounded-lg h-14 bg-white dark:bg-[#3d2a2d] border-2 border-transparent focus-within:border-[3px] focus-within:border-primary focus-within:shadow-[0_0_0_1px_rgba(249,115,22,0.1)] transition-all w-full">
                      <input className="flex-1 bg-transparent border-none text-[#1b0e10] dark:text-white focus:ring-0 focus:outline-none placeholder:text-gray-500 text-base px-4 min-w-0" placeholder={t('donateNow.step2.cepPlaceholder')} type="text"/>
                    </div>
                  </label>
                </div>
                <div className="md:col-span-1">
                  <label className="flex flex-col gap-2">
                    <span className="text-gray-900 dark:text-white text-base font-medium">{t('donateNow.step2.city')}</span>
                    <div className="flex items-stretch rounded-lg h-14 bg-white dark:bg-[#3d2a2d] border-2 border-transparent focus-within:border-[3px] focus-within:border-primary focus-within:shadow-[0_0_0_1px_rgba(249,115,22,0.1)] transition-all w-full">
                      <input className="flex-1 bg-transparent border-none text-[#1b0e10] dark:text-white focus:ring-0 focus:outline-none placeholder:text-gray-500 text-base px-4 min-w-0" placeholder={t('donateNow.step2.cityPlaceholder')} type="text"/>
                    </div>
                  </label>
                </div>
                <div className="md:col-span-1">
                  <label className="flex flex-col gap-2">
                    <span className="text-gray-900 dark:text-white text-base font-medium">{t('donateNow.step2.state')}</span>
                    <div className="flex items-stretch rounded-lg h-14 bg-white dark:bg-[#3d2a2d] border-2 border-transparent focus-within:border-[3px] focus-within:border-primary focus-within:shadow-[0_0_0_1px_rgba(249,115,22,0.1)] transition-all w-full">
                      <select className="flex-1 bg-transparent border-none text-[#1b0e10] dark:text-white focus:ring-0 focus:outline-none text-base px-4 min-w-0 appearance-none">
                        <option value="" className="bg-white dark:bg-background-dark text-[#1b0e10] dark:text-white">{t('donateNow.step2.stateSelect')}</option>
                        <option value="SP" className="bg-white dark:bg-background-dark text-[#1b0e10] dark:text-white">{t('donateNow.step2.stateSp')}</option>
                        <option value="RJ" className="bg-white dark:bg-background-dark text-[#1b0e10] dark:text-white">{t('donateNow.step2.stateRj')}</option>
                        <option value="MG" className="bg-white dark:bg-background-dark text-[#1b0e10] dark:text-white">{t('donateNow.step2.stateMg')}</option>
                      </select>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Step2Donate