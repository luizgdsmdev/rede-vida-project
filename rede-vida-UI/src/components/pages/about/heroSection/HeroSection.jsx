import { useTranslation } from 'react-i18next'

function HeroSection() {
  const { t } = useTranslation()
  return (
    <section className="relative px-6 py-12 md:px-12 lg:px-12">
        <div className="max-w-[1400px] mx-auto align-center rounded-xl overflow-hidden min-h-[450px] flex items-end justify-center relative bg-background-dark">
            <div className="absolute inset-0 opacity-50 bg-cover bg-center" data-alt="Close up of person receiving care from a healthcare professional" style={{backgroundImage: "url('/assets/pages/about/about-hero-image.png')"}}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
            <div className="relative z-10 text-center max-w-3xl px-10 pb-12">
                <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight mb-4">{t('about.hero.title')}</h1>
                <p className="text-gray-300 text-lg md:text-xl font-medium">{t('about.hero.subtitle')}</p>
            </div>
        </div>
    </section>
  )
}

export default HeroSection