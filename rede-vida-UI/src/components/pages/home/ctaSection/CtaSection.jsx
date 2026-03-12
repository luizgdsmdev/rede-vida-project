import { useTranslation } from 'react-i18next'
import ScrollAnimation from '../../../shared/ScrollAnimation/ScrollAnimation'
import { Link } from 'react-router-dom'

function CtaSection() {
  const { t } = useTranslation()
  return (
    <section className="w-full bg-white dark:bg-background-dark py-12 px-6 md:px-10 lg:px-10 text-center">
        <ScrollAnimation animation="fade-up" delay={600}>
            <div className="mt-0">
                <Link to="/login" className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">{t('become_donor')}</Link>
            </div>
        </ScrollAnimation>
    </section>
  )
}

export default CtaSection
