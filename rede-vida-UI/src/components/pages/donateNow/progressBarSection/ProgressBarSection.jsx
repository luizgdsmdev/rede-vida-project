import {useTranslation} from 'react-i18next'
import ScrollAnimation from '../../../shared/ScrollAnimation/ScrollAnimation'

const ProgressBarSection = ({ currentStep, totalSteps = 4, isCompleted = false }) => {
  const {t} = useTranslation()
  const progressPercentage = isCompleted ? 100 : Math.round((currentStep / totalSteps) * 100);
  
  const getStepTitle = () => {
    switch(currentStep) {
      case 1: return t('donateNow.progressBar.step1');
      case 2: return t('donateNow.progressBar.step2');
      case 3: return t('donateNow.progressBar.step3');
      case 4: return t('donateNow.progressBar.step4');
      default: return t('donateNow.progressBar.step1');
    }
  };

  const getStepDescription = () => {
    switch(currentStep) {
      case 1: return t('donateNow.progressBar.step1Description');
      case 2: return t('donateNow.progressBar.step2Description');
      case 3: return t('donateNow.progressBar.step3Description');
      default: return t('donateNow.progressBar.step1Description');
    }
  };

  const getStepStatus = (stepNumber) => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'active';
    return 'pending';
  };

  const stepLabels = [t('donateNow.progressBar.step1'), t('donateNow.progressBar.step2'), t('donateNow.progressBar.step3')];

  return (
    <section className="w-full bg-white dark:bg-background-dark px-4 sm:px-6 lg:px-8 py-8 md:py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4">
          <div className="flex gap-6 justify-between items-end">
            <ScrollAnimation>
            <div>
              <h3 className="text-[#1b0e10] dark:text-white text-2xl sm:text-3xl font-black leading-[1.1] tracking-tight mb-2">
                {getStepTitle()}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg font-normal leading-normal">
                {getStepDescription()}
              </p>
            </div>
            </ScrollAnimation>
            <ScrollAnimation>
            <p className="text-primary text-lg md:text-xl font-bold leading-normal">
              {progressPercentage}% {t('donateNow.progressBar.completed')}
            </p>
            </ScrollAnimation>
          </div>
          
          <ScrollAnimation>
          <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out shadow-lg shadow-primary/20"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          </ScrollAnimation>
          <ScrollAnimation>
          <div className="flex justify-between items-center mt-4">
            {stepLabels.map((label, index) => {
              const stepNumber = index + 1;
              const status = getStepStatus(stepNumber);
              
              return (
                <span 
                  key={stepNumber}
                  className={`text-sm font-semibold px-3 py-1 rounded-full transition-all duration-300 ${
                    status === 'completed' 
                      ? 'text-primary bg-primary/10 flex items-center gap-2' 
                      : status === 'active' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {status === 'completed' && (
                    <span className="material-symbols-outlined text-base">check_circle</span>
                  )}
                  {stepNumber}. {label}
                </span>
              );
            })}
          </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}

export default ProgressBarSection