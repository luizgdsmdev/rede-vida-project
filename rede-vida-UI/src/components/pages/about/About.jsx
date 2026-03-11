import HeroSection from "./heroSection/HeroSection"
import HistorySection from "./historySection/HistorySection"

function About() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <HeroSection />
      <HistorySection />
    </div>
  )
}

export default About