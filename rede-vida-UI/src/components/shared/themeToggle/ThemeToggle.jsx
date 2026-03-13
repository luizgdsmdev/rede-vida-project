import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

function ThemeToggle() {
  const { t } = useTranslation()
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme) {
      return savedTheme === 'dark'
    }
    // Default to dark theme
    return true
  })

  useEffect(() => {
    // Apply the initial theme without transitions
    document.documentElement.classList.add('no-transition')
    
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Save to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    
    // Remove no-transition class after initial theme is set
    setTimeout(() => {
      document.documentElement.classList.remove('no-transition')
    }, 100)
  }, [isDark])

  const toggleTheme = () => {
    const newIsDark = !isDark
    
    // Add transition class for smooth animation to body
    document.body.classList.add('theme-transitioning')
    
    // Toggle the theme
    document.documentElement.classList.toggle('dark')
    setIsDark(newIsDark)
    
    // Remove transition class after animation completes
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning')
    }, 450)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60] group">
      <button 
        className={`size-12 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 ${
          isDark ? 'bg-white text-gray-900' : 'bg-gray-900 text-yellow-400'
        }`}
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <span className="material-symbols-outlined text-2xl">
          {isDark ? 'light_mode' : 'dark_mode'}
        </span>
      </button>
      
      {/* Tooltip positioned above the button */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        <div className={`relative px-2 py-1 rounded-md ${
          isDark 
            ? 'bg-gray-800 text-white border border-gray-700' 
            : 'bg-gray-100 text-gray-900 border border-gray-200'
        }`}>
          {isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
          
          {/* Arrow pointing down to the button */}
          <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 ${
            isDark 
              ? 'border-l-transparent border-r-transparent border-t-gray-800' 
              : 'border-l-transparent border-r-transparent border-t-gray-100'
          }`}></div>
        </div>
      </div>
    </div>
  )
}

export default ThemeToggle