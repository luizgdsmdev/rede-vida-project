import { useState } from 'react'
import ScrollAnimation from '../../../shared/ScrollAnimation/ScrollAnimation'
import { useTranslation } from 'react-i18next'

function Step3Donate() {
  const [selectedBloodType, setSelectedBloodType] = useState('A+')
  const { t } = useTranslation()

  return (
    <section className="w-full bg-white dark:bg-background-dark px-4 pt-0 sm:px-6 lg:px-0 py-0 md:py-0">
      <div className="max-w-7xl mx-auto pt-0">
        <div className="bg-white dark:bg-background-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <form className="p-8 space-y-8">
            <div className="space-y-6">
              <h3 className="text-lg font-bold border-b border-gray-200 dark:border-gray-700 pb-2 text-primary">{t('donateNow.step3.title')}</h3>
              <div className="text-center py-6">
                <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-relaxed">{t('donateNow.step3.subtitle')}</p>
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white text-center">{t('donateNow.step3.bloodTypeLabel')}</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <div 
                    className={`group p-4 bg-background-light dark:bg-background-dark border-2 rounded-xl transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer relative ${
                      selectedBloodType === 'A+' 
                        ? 'border-primary shadow-xl -translate-y-1' 
                        : 'border-primary/20 hover:border-primary'
                    }`}
                    onClick={() => setSelectedBloodType('A+')}
                  >
                    <div className="flex items-center justify-center">
                      <span className="text-xl font-bold text-[#1b0e10] dark:text-white">A+</span>
                    </div>
                    {selectedBloodType === 'A+' && (
                      <div className="absolute top-2 right-2">
                        <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                      </div>
                    )}
                  </div>
                  <div 
                    className={`group p-4 bg-background-light dark:bg-background-dark border-2 rounded-xl transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer relative ${
                      selectedBloodType === 'A-' 
                        ? 'border-primary shadow-xl -translate-y-1' 
                        : 'border-primary/20 hover:border-primary'
                    }`}
                    onClick={() => setSelectedBloodType('A-')}
                  >
                    <div className="flex items-center justify-center">
                      <span className="text-xl font-bold text-[#1b0e10] dark:text-white">A-</span>
                    </div>
                    {selectedBloodType === 'A-' && (
                      <div className="absolute top-2 right-2">
                        <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                      </div>
                    )}
                  </div>
                  <div 
                    className={`group p-4 bg-background-light dark:bg-background-dark border-2 rounded-xl transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer relative ${
                      selectedBloodType === 'B+' 
                        ? 'border-primary shadow-xl -translate-y-1' 
                        : 'border-primary/20 hover:border-primary'
                    }`}
                    onClick={() => setSelectedBloodType('B+')}
                  >
                    <div className="flex items-center justify-center">
                      <span className="text-xl font-bold text-[#1b0e10] dark:text-white">B+</span>
                    </div>
                    {selectedBloodType === 'B+' && (
                      <div className="absolute top-2 right-2">
                        <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                      </div>
                    )}
                  </div>
                  <div 
                    className={`group p-4 bg-background-light dark:bg-background-dark border-2 rounded-xl transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer relative ${
                      selectedBloodType === 'B-' 
                        ? 'border-primary shadow-xl -translate-y-1' 
                        : 'border-primary/20 hover:border-primary'
                    }`}
                    onClick={() => setSelectedBloodType('B-')}
                  >
                    <div className="flex items-center justify-center">
                      <span className="text-xl font-bold text-[#1b0e10] dark:text-white">B-</span>
                    </div>
                    {selectedBloodType === 'B-' && (
                      <div className="absolute top-2 right-2">
                        <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                      </div>
                    )}
                  </div>
                  <div 
                    className={`group p-4 bg-background-light dark:bg-background-dark border-2 rounded-xl transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer relative ${
                      selectedBloodType === 'AB+' 
                        ? 'border-primary shadow-xl -translate-y-1' 
                        : 'border-primary/20 hover:border-primary'
                    }`}
                    onClick={() => setSelectedBloodType('AB+')}
                  >
                    <div className="flex items-center justify-center">
                      <span className="text-xl font-bold text-[#1b0e10] dark:text-white">AB+</span>
                    </div>
                    {selectedBloodType === 'AB+' && (
                      <div className="absolute top-2 right-2">
                        <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                      </div>
                    )}
                  </div>
                  <div 
                    className={`group p-4 bg-background-light dark:bg-background-dark border-2 rounded-xl transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer relative ${
                      selectedBloodType === 'AB-' 
                        ? 'border-primary shadow-xl -translate-y-1' 
                        : 'border-primary/20 hover:border-primary'
                    }`}
                    onClick={() => setSelectedBloodType('AB-')}
                  >
                    <div className="flex items-center justify-center">
                      <span className="text-xl font-bold text-[#1b0e10] dark:text-white">AB-</span>
                    </div>
                    {selectedBloodType === 'AB-' && (
                      <div className="absolute top-2 right-2">
                        <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                      </div>
                    )}
                  </div>
                  <div 
                    className={`group p-4 bg-background-light dark:bg-background-dark border-2 rounded-xl transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer relative ${
                      selectedBloodType === 'O+' 
                        ? 'border-primary shadow-xl -translate-y-1' 
                        : 'border-primary/20 hover:border-primary'
                    }`}
                    onClick={() => setSelectedBloodType('O+')}
                  >
                    <div className="flex items-center justify-center">
                      <span className="text-xl font-bold text-[#1b0e10] dark:text-white">O+</span>
                    </div>
                    {selectedBloodType === 'O+' && (
                      <div className="absolute top-2 right-2">
                        <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                      </div>
                    )}
                  </div>
                  <div 
                    className={`group p-4 bg-background-light dark:bg-background-dark border-2 rounded-xl transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer relative ${
                      selectedBloodType === 'O-' 
                        ? 'border-primary shadow-xl -translate-y-1' 
                        : 'border-primary/20 hover:border-primary'
                    }`}
                    onClick={() => setSelectedBloodType('O-')}
                  >
                    <div className="flex items-center justify-center">
                      <span className="text-xl font-bold text-[#1b0e10] dark:text-white">O-</span>
                    </div>
                    {selectedBloodType === 'O-' && (
                      <div className="absolute top-2 right-2">
                        <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex items-center h-5">
                  <input className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary focus:ring-offset-0 dark:bg-gray-700 dark:border-gray-600 accent-primary" id="urgency" type="checkbox" defaultChecked/>
                </div>
                <div className="ml-2 text-sm">
                  <label className="font-medium text-gray-900 dark:text-white" htmlFor="urgency">{t('donateNow.step3.urgencyLabel')}</label>
                  <p className="text-gray-500 dark:text-gray-400">{t('donateNow.step3.urgencyDescription')}</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-[#974e5a] dark:text-[#c4a4a9] uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm">verified_user</span>
                <span>{t('donateNow.step3.privacyNote')}</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Step3Donate