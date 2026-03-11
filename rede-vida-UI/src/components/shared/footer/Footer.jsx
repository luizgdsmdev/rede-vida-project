import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="w-full bg-[#1b0e10] dark:bg-background-dark-footer text-white py-16 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-16">
        <div className="col-span-1 sm:col-span-3 md:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-4 text-primary mb-6">
            <div className="size-8">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-white dark:text-white text-xl font-bold">{t('footer.title')}</h2>
          </div>
          <p className="text-gray-400 dark:text-gray-400 text-sm leading-relaxed">{t('footer.description')}</p>
          <div className="flex gap-4 mt-6">
            <a className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors" href="#">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
              </svg>
            </a>
            <a className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors" href="#">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
            <a className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors" href="#">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-1 md:col-span-1 sm:mx-auto">
          <h4 className="font-bold mb-3 sm:mb-4 md:mb-6 text-center sm:text-left text-white dark:text-white">{t('footer.navigation')}</h4>
          <ul className="flex flex-col gap-2 sm:gap-3 md:gap-4 text-sm text-gray-400 dark:text-gray-400 text-center sm:text-left">
            <li><a className="hover:text-primary transition-colors" href="#">{t('footer.home')}</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">{t('footer.about')}</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">{t('footer.hemocenters')}</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">{t('footer.faq')}</a></li>
          </ul>
        </div>
        <div className="col-span-1 sm:col-span-1 md:col-span-1 sm:mx-auto">
          <h4 className="font-bold mb-3 sm:mb-4 md:mb-6 text-center sm:text-left text-white dark:text-white">{t('footer.donate')}</h4>
          <ul className="flex flex-col gap-2 sm:gap-3 md:gap-4 text-sm text-gray-400 dark:text-gray-400 text-center sm:text-left">
          <li><a className="hover:text-primary transition-colors" href="#">{t('footer.requirements')}</a></li>
          <li><a className="hover:text-primary transition-colors" href="#">{t('footer.preparation')}</a></li>
          <li><a className="hover:text-primary transition-colors" href="#">{t('footer.postDonation')}</a></li>
          <li><a className="hover:text-primary transition-colors" href="#">{t('footer.myths')}</a></li>
          </ul>
        </div>
        <div className="col-span-1 sm:col-span-3 md:col-span-1 lg:col-span-1 sm:mx-auto">
          <h4 className="font-bold mb-3 sm:mb-4 md:mb-6 text-center sm:text-left text-white dark:text-white">{t('footer.support')}</h4>
          <ul className="flex flex-col gap-2 sm:gap-3 md:gap-4 text-sm text-gray-400 dark:text-gray-400 text-center sm:text-left">
          <li><a className="hover:text-primary transition-colors" href="#">{t('footer.contact')}</a></li>
          <li><a className="hover:text-primary transition-colors" href="#">{t('footer.partnerships')}</a></li>
          <li><a className="hover:text-primary transition-colors" href="#">{t('footer.privacyPolicy')}</a></li>
          <li><a className="hover:text-primary transition-colors" href="#">{t('footer.termsOfUse')}</a></li>
          </ul>
        </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-500">{t('footer.copyright')}</p>
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-500">
            <span>{t('footer.hashtag1')}</span>
            <span>{t('footer.hashtag2')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
