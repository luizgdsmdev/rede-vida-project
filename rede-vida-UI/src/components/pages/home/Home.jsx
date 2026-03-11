import HeroSection from './HeroSection/HeroSection'

import StatsSection from './statsSection/StatsSection'

import InteractiveSearch from './interactiveSearch/InteractiveSearch'
import InformationCards from './informationCards/InformationCards'

function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <InteractiveSearch />
      <InformationCards />
    </div>
  )
}

export default Home