import React, { useState, useCallback } from 'react';
import Logo from "../header/logo/Logo";
import Navigation from "../header/navigation/Navigation";
import MenuButtom from "../header/menuButtom/MenuButtom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-3xl border-b border-solid border-[#f3e7e9] dark:border-[#3d2a2d] px-6 lg:px-12 py-3">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between whitespace-nowrap">
            <Logo />
            
            <MenuButtom toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            
            <Navigation isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />  
        </div>
    </header>
  )
}

export default Header