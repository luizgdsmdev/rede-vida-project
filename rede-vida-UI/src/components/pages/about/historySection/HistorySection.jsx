import { useTranslation } from 'react-i18next'
import ScrollAnimation from '../../../shared/ScrollAnimation/ScrollAnimation'

function HistorySection() {
  const { t } = useTranslation()
  return (
    <section className="px-6 py-16 md:px-20 lg:px-40 grid md:grid-cols-2 gap-12 items-center">
        <ScrollAnimation animation="fade-up" delay={100}>
        <div className="max-w-[1400px] space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 leading-tight">{t('about.history.title')}</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{t('about.history.description1')}</p>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{t('about.history.description2')}</p>
        </div>
        </ScrollAnimation>
        <ScrollAnimation animation="fade-up" delay={300}>
        <div className="rounded-xl overflow-hidden h-80 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
            <img className="w-full h-full object-cover" alt="Inspirational photo showing hands together symbolizing community support and blood donation impact" src="/assets/pages/about/about-history-image.png"/>
        </div>
        </ScrollAnimation>
    </section>
  )
}

export default HistorySection