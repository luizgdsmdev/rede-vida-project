import HeroSection from "./heroSection/HeroSection"
import HistorySection from "./historySection/HistorySection"
import ValuesSection from "./valuesSection/ValuesSection"
import HowItWorksSection from "./howtWorks/HowItWorksSection"

function About() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <HeroSection />
      <HistorySection />
      <ValuesSection />
      <HowItWorksSection />
    </div>
  )
}

export default About