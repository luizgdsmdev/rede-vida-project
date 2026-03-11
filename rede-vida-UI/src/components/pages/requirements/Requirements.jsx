import HeroSection from './heroSection/heroSection'
import BasicRequirements from './BasicRequirements/BasicRequirements'
import ImpedimentsSection from './impedimentsSection/ImpedimentsSection'
import PreparationSection from './preparationSection/PreparationSection'
import CTASection from './ctaSection/CTASection'

function Requirements() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <HeroSection />
      <BasicRequirements />
      <ImpedimentsSection />
      <PreparationSection />
      <CTASection />
    </div>
  )
}

export default Requirements