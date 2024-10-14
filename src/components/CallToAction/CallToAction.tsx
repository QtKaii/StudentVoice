import React from 'react'
import { motion } from 'framer-motion'

const CallToAction: React.FC = () => {
  return (
    <div className="bg-blue-700 dark:bg-blue-800">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl font-extrabold text-white sm:text-4xl font-display"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="block">Ready to make a difference?</span>
          <span className="block">Join StudentVoice today.</span>
        </motion.h2>
        <motion.p 
          className="mt-4 text-lg leading-6 text-blue-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Be part of the change on your campus. Sign up now and start making your voice heard.
        </motion.p>
        <motion.a
          href="#"
          className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 dark:text-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 sm:w-auto transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign up with your school email
        </motion.a>
      </div>
    </div>
  )
}

export default CallToAction