import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSelector = () => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'pt', name: 'PT', flag: '🇧🇷' },
    { code: 'en', name: 'EN', flag: '🇺🇸' },
    { code: 'es', name: 'ES', flag: '🇪🇸' }
  ]

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#f3e7e9] dark:border-[#3d2a2d] bg-white dark:bg-background-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        aria-label="Change language"
      >
        <span className="text-lg flex-shrink-0">{currentLanguage.flag}</span>
        <span className="text-sm font-medium text-[#1b0e10] dark:text-gray-300">
          {currentLanguage.name}
        </span>
        <svg
          className={`w-4 h-4 text-[#1b0e10] dark:text-gray-300 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 left-0 mt-2 w-full bg-white dark:bg-background-dark border border-[#f3e7e9] dark:border-[#3d2a2d] rounded-lg shadow-lg z-[100]">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                language.code === i18n.language ? 'bg-primary/10 text-primary' : 'text-[#1b0e10] dark:text-gray-300'
              }`}
            >
              <span className="text-lg flex-shrink-0">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSelector
