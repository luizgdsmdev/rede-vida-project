import ScrollAnimation from '../../../shared/ScrollAnimation/ScrollAnimation';
import { useTranslation } from 'react-i18next';

const InteractiveSearch = () => {
  const { t } = useTranslation();
  return (
    <section className="w-full bg-[#f8f6f6] dark:bg-background-dark-2 py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-40">
            <ScrollAnimation animation="fade-up" delay={100}>
                <div className="flex flex-col gap-2 mb-10">
                    <h2 className="text-[#1b0e10] dark:text-white text-3xl font-bold tracking-tight">{t('home.interactiveSearch.title')}</h2>
                    <p className="text-gray-600 dark:text-gray-400">{t('home.interactiveSearch.description')}</p>
                </div>
            </ScrollAnimation>
            <div className="flex flex-col lg:flex-row gap-0 bg-white dark:bg-[#2a1a1d] rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 min-h-[600px]">
                <div className="w-full lg:w-[400px] flex flex-col border-r border-gray-100 dark:border-gray-800">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-background-dark/20">
                        <ScrollAnimation animation="fade-up" delay={200}>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{t('home.interactiveSearch.searchIcon')}</span>
                                <div className="flex items-stretch rounded-lg h-10 bg-white dark:bg-[#3d2a2d] border-2 border-transparent focus-within:border-[3px] focus-within:border-primary focus-within:shadow-[0_0_0_1px_rgba(249,115,22,0.1)] transition-all w-full">
                                    <input className="flex-1 bg-transparent border-none text-[#1b0e10] dark:text-white focus:ring-0 focus:outline-none placeholder:text-gray-500 text-sm pl-7 pr-4 min-w-0" placeholder={t('home.interactiveSearch.searchPlaceholder')} type="text"/>
                                </div>
                            </div>
                        </ScrollAnimation>
                    </div>
                    <div className="flex-1 overflow-y-auto max-h-[500px] lg:max-h-none scrollbar-thin">
                    <ScrollAnimation animation="fade-up" delay={300}>
                        <div className="p-5 border-b border-gray-100 dark:border-gray-800 hover:bg-primary/5 cursor-pointer transition-colors group">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-[#1b0e10] dark:text-white group-hover:text-primary transition-colors">{t('home.interactiveSearch.hemocentroTitle')}</h3>
                                <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded uppercase">{t('home.interactiveSearch.open')}</span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-start gap-1">
                            <span className="material-symbols-outlined text-[14px]">location_on</span> {t('home.interactiveSearch.address')}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-primary">{t('home.interactiveSearch.distance')}</span>
                                <button className="text-xs bg-primary text-white px-3 py-1.5 rounded-md font-bold hover:bg-primary/90">{t('home.interactiveSearch.schedule')}</button>
                            </div>
                        </div>
                    </ScrollAnimation>
                    <ScrollAnimation animation="fade-up" delay={400}>
                        <div className="p-5 border-b border-gray-100 dark:border-gray-800 bg-primary/5 dark:bg-primary/10 border-l-4 border-l-primary">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-[#1b0e10] dark:text-white text-primary">{t('home.interactiveSearch.hemocentroTitle')}</h3>
                                <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded uppercase">{t('home.interactiveSearch.open')}</span>
                            </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-start gap-1">
                                <span className="material-symbols-outlined text-[14px]">location_on</span> {t('home.interactiveSearch.address')}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-primary">{t('home.interactiveSearch.distance')}</span>
                                <button className="text-xs bg-primary text-white px-3 py-1.5 rounded-md font-bold">{t('home.interactiveSearch.schedule')}</button>
                            </div>
                        </div>
                    </ScrollAnimation>
                    <ScrollAnimation animation="fade-up" delay={500}>
                    <div className="p-5 border-b border-gray-100 dark:border-gray-800 hover:bg-primary/5 cursor-pointer transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-[#1b0e10] dark:text-white">{t('home.interactiveSearch.hemocentroTitle')}</h3>
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded uppercase">{t('home.interactiveSearch.closed')}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-start gap-1">
                        <span className="material-symbols-outlined text-[14px]">location_on</span>{t('home.interactiveSearch.address')}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-primary">{t('home.interactiveSearch.distance')}</span>
                            <button className="text-xs bg-primary text-white px-3 py-1.5 rounded-md font-bold hover:bg-primary/90">{t('home.interactiveSearch.schedule')}</button>
                        </div>
                    </div>
                    </ScrollAnimation>
                    <ScrollAnimation animation="fade-up" delay={500}>
                    <div className="p-5 border-b border-gray-100 dark:border-gray-800 hover:bg-primary/5 cursor-pointer transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-[#1b0e10] dark:text-white">{t('home.interactiveSearch.hemocentroTitle')}</h3>
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded uppercase">{t('home.interactiveSearch.open')}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-start gap-1">
                        <span className="material-symbols-outlined text-[14px]">location_on</span>{t('home.interactiveSearch.address')}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-primary">{t('home.interactiveSearch.distance')}</span>
                            <button className="text-xs bg-primary text-white px-3 py-1.5 rounded-md font-bold hover:bg-primary/90">{t('home.interactiveSearch.schedule')}</button>
                        </div>
                    </div>
                    </ScrollAnimation>
                    </div>
                </div>
                <div className="flex-1 bg-[#e5e7eb] dark:bg-[#1a1112] relative min-h-[400px]">
                    <div className="absolute inset-0 bg-cover bg-center grayscale dark:invert opacity-30" data-alt="Abstract map background showing street grid" data-location="São Paulo" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDsU3wysApO6t6uj6ajuehtZrramSvdFusi1FOYWoqQTjjcoSM9XI8V3RYLKyW9nuQdGXeT0M7mb-6AhKbwixh9095N11Mb3enIWydEP-zQLPZlXrr8NsJ5r5D--im_HDA_EPSMiqwX43juSlQDO-p4TbJx8lBCCERTbA85KDkFkYonxVQwoyaCOQ7fPQ_NNQPH8yOQjRgp7h0EHlLPSD7WGbVqXKINq81Tf-TfIc-KLpYS05B1rXIwmx-lM0VEAXvKFmlBgUK2DA')"}}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                            <div className="absolute -top-12 -left-20 bg-white dark:bg-background-dark p-2 rounded shadow-lg border border-primary/20 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-sm">water_drop</span>
                                <span className="text-[10px] font-bold whitespace-nowrap">{t('home.interactiveSearch.hemocentroTitleMap')}</span>
                            </div>
                            <span className="material-symbols-outlined text-primary text-4xl drop-shadow-md">location_on</span>
                        </div>
                        <div className="absolute top-20 right-40">
                            <span className="material-symbols-outlined text-primary/60 text-3xl">location_on</span>
                        </div>
                        <div className="absolute bottom-20 left-40">
                            <span className="material-symbols-outlined text-primary/60 text-3xl">location_on</span>
                        </div>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-background-dark/90 p-2 rounded shadow-md text-[10px] font-bold uppercase tracking-widest border border-gray-100 dark:border-gray-800">{t('home.interactiveSearch.mapMode')}</div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default InteractiveSearch