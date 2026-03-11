import HeroSection from './HeroSection/HeroSection'

import ThemeToggle from '../../shared/themeToggle/ThemeToggle'
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
      <ThemeToggle />
    </div>
  )
}

export default Home