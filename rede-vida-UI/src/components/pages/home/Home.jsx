import HeroSection from './HeroSection/HeroSection'

import StatsSection from './statsSection/StatsSection'

import InteractiveSearch from './interactiveSearch/InteractiveSearch'
import InformationCards from './informationCards/InformationCards'
import CtaSection from './ctaSection/CtaSection'

function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <InteractiveSearch />
      <InformationCards />
      <CtaSection />
    </div>
  )
}

export default Home