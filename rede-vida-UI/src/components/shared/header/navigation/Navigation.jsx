import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSelector from "../languageSelector/LanguageSelector"

const navLinkClass = "block text-[#1b0e10] dark:text-gray-300 text-sm font-medium py-2 px-5 rounded-lg transition-all duration-300 cursor-pointer hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20";

function Navigation({ isMenuOpen, toggleMenu }) {
  const { t } = useTranslation()
  return (
    <>
      {/* Menu Desktop */}
      <div className="hidden lg:flex justify-end gap-8 items-center">
          <nav className="flex items-center gap-4">
              <a className={navLinkClass} href="#">
                {t('navigation.about')}
              </a>
              <a className={navLinkClass} href="#">
                {t('navigation.locations')}
              </a>
              <a className={navLinkClass} href="#">
                {t('navigation.requirements')}
              </a>
              <a className={navLinkClass} href="#">
                {t('navigation.contact')}
              </a>
          </nav>
          <button className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">{t('donate_now')}</button>
          <div className="relative">
            <LanguageSelector />
          </div>
      </div>

      {/* Menu Mobile */}
      <div className={`lg:hidden fixed top-[60px] left-0 right-0 bg-white/95 dark:bg-background-dark/95 backdrop-blur-3xl border-b border-[#f3e7e9] dark:border-[#3d2a2d] transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
          <div className="flex flex-col p-6 gap-6">
              <nav className="flex flex-col gap-4">
                  <a className={`${navLinkClass} text-center`} href="#" onClick={toggleMenu}>
                      {t('navigation.about')}
                  </a>
                  <a className={`${navLinkClass} text-center`} href="#" onClick={toggleMenu}>
                      {t('navigation.locations')}
                  </a>
                  <a className={`${navLinkClass} text-center`} href="#" onClick={toggleMenu}>
                      {t('navigation.requirements')}
                  </a>
                  <a className={`${navLinkClass} text-center`} href="#" onClick={toggleMenu}>
                      {t('navigation.contact')}
                  </a>
              </nav>
              <button className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">{t('donate_now')}</button>
              <LanguageSelector />
              {/* <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-primary/10" alt="User profile avatar placeholder" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD07DDp1m9FZix1SQ56dxdr4qgSb2sJZM8eAS_-h-lWJYKJ7IHFurOPMiL95MdMUpSpvQZee4wo5ew6h-zRBH-3K9wnnSH_XcCo7SAUxFSZrU96x4W_h6MvZjMjvKjOu-VcLTz-C4NF98TcZtgH2kOkq_rVHief11i1S6Ms--UJ06iwcEfczPEX8KraA0enp16mLxWLPFenCvPKFAWyAdR0Kax7d-vry-teAgb3m8ze5ibeYKV9LPrSLisgL-OwwsFW1ubiSQJzjA")' }}></div> */}
          </div>
      </div>
    </>
  )
}

export default memo(Navigation)