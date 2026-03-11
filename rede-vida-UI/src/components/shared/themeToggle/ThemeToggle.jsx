import { useState, useEffect } from 'react'

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => 
    document.documentElement.classList.contains('dark')
  )

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    document.documentElement.classList.toggle('dark')
    setIsDark(newIsDark)
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