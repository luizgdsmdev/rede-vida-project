import HeroSection from './HeroSection/HeroSection'

import ThemeToggle from '../../shared/themeToggle/ThemeToggle'
import StatsSection from './statsSection/StatsSection'

function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <ThemeToggle />
    </div>
  )
}

export default Home