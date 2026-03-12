import { useTranslation } from 'react-i18next'
import ScrollAnimation from '../../../shared/ScrollAnimation/ScrollAnimation'
import { Link } from 'react-router-dom'

function CTASection() {
  const { t } = useTranslation()
  return (
    <section className="w-full bg-background-light dark:bg-background-dark py-12 px-6 pt-20 pb-20 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
            <ScrollAnimation animation="fade-up" delay={100}>
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-[#1b0e10] dark:text-white mb-4">{t('requirements.cta.title')}</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">{t('requirements.cta.description')}</p>
                </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-up" delay={200}>
                <div className="flex flex-wrap justify-center gap-6">
                    <ScrollAnimation animation="fade-up" delay={300}>
                        <Link to="/location" className="group bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 flex items-center gap-3">
                            <span className="material-symbols-outlined text-2xl">location_on</span>
                            <span>{t('requirements.cta.findCenters')}</span>
                        </Link>
                    </ScrollAnimation>

                    <ScrollAnimation animation="fade-up" delay={400}>
                        <Link to="/requirements" className="group bg-background-light dark:bg-background-dark border-2 border-primary text-primary font-bold px-8 py-4 rounded-xl hover:border-primary/80 hover:bg-primary/5 transition-all hover:shadow-xl hover:-translate-y-1 flex items-center gap-3">
                            <span className="material-symbols-outlined text-2xl">help</span>
                            <span>{t('requirements.cta.faq')}</span>
                        </Link>
                    </ScrollAnimation>
                </div>
            </ScrollAnimation>
        </div>
    </section>
  )
}

export default CTASection