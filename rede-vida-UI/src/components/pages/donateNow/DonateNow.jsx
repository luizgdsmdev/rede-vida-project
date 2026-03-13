import React, { useState } from 'react'
import HeadlineText from './HeadlineText/HeadlineText'
import RoleSelectionCards from './steps/Step1Donate'
import SingleButton from './singleButton/SingleButton'
import ProgressBarSection from './ProgressBarSection/ProgressBarSection'
import Step2Donate from './steps/Step2Donate'
import Step3Donate from './steps/Step3Donate'

const Step1 = () => (
  <div>
    <HeadlineText/>
    <RoleSelectionCards />
    <SingleButton />
  </div>
)

const Step2 = () => (
  <Step2Donate />
)

const Step3 = () => (
  <Step3Donate />
)

function DonateNow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isCompleted, setIsCompleted] = useState(false)

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return <Step1 />
      case 2:
        return <Step2 />
      case 3:
        return <Step3 />
      default:
        return <Step1 />
    }
  }

  const nextStep = () => {
    if (currentStep === 3) {
      setIsCompleted(true)
      // Add form submission logic
      return
    }
    setCurrentStep(prev => Math.min(prev + 1, 3))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const prevStep = () => {
    if (isCompleted) {
      setIsCompleted(false)
      setCurrentStep(3)
      return
    }
    setCurrentStep(prev => Math.max(prev - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <ProgressBarSection currentStep={currentStep} totalSteps={4} isCompleted={isCompleted} />
      
      <section className="w-full bg-white dark:bg-background-dark px-4 sm:px-6 lg:px-8 py-12 md:py-12">
        <div className="max-w-7xl mx-auto">
            {/* Step Content */}
            {renderStep()}  

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 px-4 py-6">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-lg sm:rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100 dark:disabled:hover:bg-gray-800 transform hover:scale-105 active:scale-95 text-sm sm:text-base"
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-lg sm:text-xl">arrow_back</span>
                  <span className="hidden sm:inline">Anterior</span>
                  <span className="sm:hidden">Voltar</span>
                </span>
              </button>
              
              <button
                onClick={nextStep}
                disabled={currentStep === 3 && !isCompleted}
                className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 bg-primary text-white font-semibold rounded-lg sm:rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 text-sm sm:text-base"
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="hidden sm:inline">{isCompleted ? 'Concluído' : (currentStep === 3 ? 'Finalizar' : 'Próximo')}</span>
                  <span className="sm:hidden">{isCompleted ? 'Concluído' : (currentStep === 3 ? 'Finalizar' : 'Avançar')}</span>
                  <span className="material-symbols-outlined text-lg sm:text-xl">
                    {isCompleted ? 'check_circle' : (currentStep === 3 ? 'check' : 'arrow_forward')}
                  </span>
                </span>
              </button>
            </div>
        </div>
      </section>
    </>
  )
}

export default DonateNow