import { useState, useEffect } from 'react'

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme) {
      return savedTheme === 'dark'
    }
    return prefersDark
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
    <button 
      className={`fixed bottom-6 right-6 z-[60] size-12 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 ${
        isDark ? 'bg-white text-gray-900' : 'bg-gray-900 text-yellow-400'
      }`}
      onClick={toggleTheme}
    >
      <span className="material-symbols-outlined text-2xl">
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  )
}

export default ThemeToggle