import React from 'react'
import HeroContent from './HeroContent'
import HeroImage from './HeroImage'
import { useTheme } from '../../context/ThemeContext'

const Hero: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`relative overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        <div className={`relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <svg
            className={`hidden lg:block absolute right-0 inset-y-0 h-full w-48 transform translate-x-1/2 ${darkMode ? 'text-gray-900' : 'text-white'}`}
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
          <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left lg:py-12">
              <HeroContent />
            </div>
          </main>
        </div>
      </div>
      <HeroImage />
    </div>
  )
}

export default Hero