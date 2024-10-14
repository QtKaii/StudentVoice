import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

const HeroContent = () => {
  const { darkMode } = useTheme();

  return (
    <>
      <motion.h1 
        className={`text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl font-display ${darkMode ? 'text-white' : 'text-gray-900'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="block xl:inline">Amplify your voice on</span>{' '}
        <span className="block text-blue-600 xl:inline">campus</span>
      </motion.h1>
      <motion.p 
        className={`mt-3 text-base sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        StudentVoice empowers you to connect with peers, propose ideas, and make real changes in your school. Your email is your power to sign petitions and influence decisions.
      </motion.p>
      <motion.div 
        className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="rounded-md shadow">
          <a
            href="#"
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Join the conversation
          </a>
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-3">
          <a
            href="#"
            className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md md:py-4 md:text-lg md:px-10 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 ${
              darkMode
                ? 'text-gray-300 bg-gray-800 hover:bg-gray-700'
                : 'text-blue-700 bg-blue-100 hover:bg-blue-200'
            }`}
          >
            Learn more
          </a>
        </div>
      </motion.div>
    </>
  )
}

export default HeroContent