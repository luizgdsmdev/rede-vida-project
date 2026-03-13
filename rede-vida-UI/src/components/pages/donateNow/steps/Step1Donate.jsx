import { useState } from 'react'
import ScrollAnimation from '../../../shared/ScrollAnimation/ScrollAnimation'
import { useTranslation } from 'react-i18next'

function Step1Donate() {
  const [selectedRole, setSelectedRole] = useState(null)
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 mb-10">
      <ScrollAnimation>
      <div 
        className={`group p-8 bg-background-light dark:bg-background-dark border-2 rounded-2xl transition-all hover:shadow-xl hover:-translate-y-1 min-h-full cursor-pointer ${
          selectedRole === 'donor' 
            ? 'border-primary shadow-xl -translate-y-1' 
            : 'border-primary/20 hover:border-primary'
        }`}
        onClick={() => setSelectedRole('donor')}
      >
        <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
          <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: 'FILL 1'}}>person</span>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-[#1b0e10] dark:text-white mb-3">{t('donateNow.donor')}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{t('donateNow.donorDescription')}</p>
        </div>
        {selectedRole === 'donor' && (
          <div className="absolute top-4 right-4">
            <span className="material-symbols-outlined text-primary text-2xl">check_circle</span>
          </div>
        )}
      </div>
        </ScrollAnimation>
      <ScrollAnimation>
      <div 
        className={`group p-8 bg-background-light dark:bg-background-dark border-2 rounded-2xl transition-all hover:shadow-xl hover:-translate-y-1 min-h-full cursor-pointer relative ${
          selectedRole === 'institution' 
            ? 'border-primary shadow-xl -translate-y-1' 
            : 'border-primary/20 hover:border-primary'
        }`}
        onClick={() => setSelectedRole('institution')}
      >
        <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
          <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: 'FILL 1'}}>business</span>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-[#1b0e10] dark:text-white mb-3">{t('donateNow.institution')}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{t('donateNow.institutionDescription')}</p>
        </div>
        {selectedRole === 'institution' && (
          <div className="absolute top-4 right-4">
            <span className="material-symbols-outlined text-primary text-2xl">check_circle</span>
          </div>
        )}
      </div>
      </ScrollAnimation>
    </div>
  )
}

export default Step1Donate