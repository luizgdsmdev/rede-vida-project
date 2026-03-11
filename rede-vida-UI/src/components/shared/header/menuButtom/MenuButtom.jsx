import React, { memo } from 'react'

const MenuButtom = memo(function MenuButtom({ toggleMenu, isMenuOpen }) {
  const spanClass = "block w-5 h-0.5 bg-[#1b0e10] dark:bg-gray-300 transition-all duration-300";
  
  return (
    <>
      {/* Hamburger for Mobile */} 
      <button 
        onClick={toggleMenu}
        className="lg:hidden flex flex-col items-center justify-center w-6 h-6 gap-1.5"
        aria-label="Toggle menu"
      >
        <span className={`${spanClass} ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`${spanClass} ${isMenuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`${spanClass} ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>
    </>
  )
})

export default MenuButtom