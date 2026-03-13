import React from 'react'
import ScrollAnimation from '../../../shared/ScrollAnimation/ScrollAnimation'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function SingleButton() {
  const { t } = useTranslation()
  return (
    <ScrollAnimation>
      <div className="flex flex-col items-center gap-6 px-4 py-6 pb-6 pt-2">
        <div className="flex flex-col items-center gap-2 border-t border-gray-200 dark:border-gray-700 pt-4 w-full max-w-[400px]">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            {t('donateNow.alreadyHaveAccount')}{' '}
            <Link 
              to="/login" 
              className="text-primary font-bold hover:text-primary/80 transition-colors underline decoration-2 hover:underline-offset-4"
            >
              {t('donateNow.login')}
            </Link>
          </p>
        </div>
      </div>
    </ScrollAnimation>
  )
}

export default SingleButton