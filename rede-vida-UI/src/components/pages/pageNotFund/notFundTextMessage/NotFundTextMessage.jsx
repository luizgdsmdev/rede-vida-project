import React from 'react'
import { NavLink } from 'react-router-dom'
import ScrollAnimation from '../../../shared/ScrollAnimation/ScrollAnimation'
import { useTranslation } from 'react-i18next'

function NotFundTextMessage() {
  const { t } = useTranslation()
  
  return (
    <ScrollAnimation className="flex flex-col items-center justify-center text-center space-y-6 px-4">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary leading-[1.1] tracking-tight mb-4">
        {t('notFound.title', 'Ops... Did you got lost?')}
      </h2>
      <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-medium max-w-md">
        {t('notFound.description', 'Why don\'t you try go back ')}
        <NavLink 
          to="/" 
          className="text-primary font-bold hover:text-primary/80 transition-colors underline decoration-2 hover:underline-offset-4 mx-1"
        >
          {t('notFound.homeLink', 'home')}
        </NavLink>
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-500">
        {t('notFound.design', 'Design by')}{' '}
        <a 
          href="https://codepen.io/code2rithik/pen/XWpVvYL" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-primary hover:text-primary/80 transition-colors"
        >
          codepen.io
        </a>
      </p>
    </ScrollAnimation>
  )
}

export default NotFundTextMessage