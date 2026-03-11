import HeroSection from './HeroSection/HeroSection'

import ThemeToggle from '../../shared/themeToggle/ThemeToggle'
import StatsSection from './statsSection/StatsSection'

import InteractiveSearch from './interactiveSearch/InteractiveSearch'

function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <InteractiveSearch />
      <ThemeToggle />
    </div>
  )
}

export default Home