import { useTranslation } from 'react-i18next';
import ScrollAnimation from '../../../shared/ScrollAnimation/ScrollAnimation';

const VisualImageSection = () => {
  const { t } = useTranslation();
  return (
    <div className="hidden md:block w-full md:w-1/2 lg:w-1/2 relative overflow-hidden bg-background-dark h-full">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCUOpfvp5GhRdUiifyQJ46d50CrYoAtejmF_goM4tFqNp2tAc8VzAQDcqswZ3jtvxcSHbwkB5AxhryRWGjhLBy_gQ0AXbyr-1k9VsXIOizo0ped5J3w4cb1k1xBZc5dkp1F3urs9lreQPp9Fkf6fyp8NrqLVWYTnfBYlzfqBa4KuvSKoxOQHQKwxcRDp2jXtCA-MUabDPVdaKleaUdYEj0iIdIjo-k4FZcBRe3JkFxJIhImR6QgVPoZQkSBcZHSf6QtnEUBlpM3bZQ')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/90 via-primary/40 to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent"></div>
        <div className="absolute top-12 sm:top-6 md:top-0 md:pl-6 lg:top-12 left-0 p-4 pt-4 pb-8 md:p-16 text-white max-w-xl">
            <ScrollAnimation animation="fade-up" delay={100}>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30">
                <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                <span className="text-sm font-bold tracking-wide">{t('login.visualImageSection.title')}</span>
            </div>
            <h2 className="text-5xl font-extrabold leading-tight mb-6 text-white">{t('login.visualImageSection.subtitle')}</h2>
            <p className="text-xl text-white/90 leading-relaxed mb-8">{t('login.visualImageSection.description')}</p>
            </ScrollAnimation>
            <div className="flex items-center gap-12">
                <ScrollAnimation animation="fade-up" delay={200}>
                <div>
                    <div className="text-3xl font-bold text-white">12k+</div>
                    <div className="text-sm text-white/70 font-medium">{t('login.visualImageSection.donors')}</div>
                </div>
                </ScrollAnimation>
                <ScrollAnimation animation="fade-up" delay={300}>
                <div>
                    <div className="text-3xl font-bold text-white">48k+</div>
                    <div className="text-sm text-white/70 font-medium">{t('login.visualImageSection.lives')}</div>
                </div>
                </ScrollAnimation>
                <ScrollAnimation animation="fade-up" delay={400}>
                <div>
                    <div className="text-3xl font-bold text-white">150+</div>
                    <div className="text-sm text-white/70 font-medium">{t('login.visualImageSection.hospitals')}</div>
                </div>
                </ScrollAnimation>
            </div>
        </div>
        <div className="absolute top-10 right-10 w-32 h-32 border-t-2 border-r-2 border-white/20 rounded-tr-3xl"></div>
    </div>
  )
}

export default VisualImageSection