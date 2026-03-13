import Header from '../../shared/Header/Header'
import Footer from '../../shared/footer/Footer'
import ThemeToggle from '../../shared/themeToggle/ThemeToggle'
import SvgComponents from './svgComponents/SvgComponents'
import NotFundTextMessage from './notFundTextMessage/NotFundTextMessage'

function PageNotFund() {
  return (
    <div className="min-h-screen bg-white dark:bg-background-dark flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 gap-8">
        <SvgComponents />
        <NotFundTextMessage />
      </main>
      <Footer />
      <ThemeToggle />
    </div>
  )
}

export default PageNotFund