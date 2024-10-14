import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

interface StepProps {
  id: string;
  name: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ id, name, description }) => {
  const { darkMode } = useTheme();

  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <dt>
        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
          <span className="text-lg font-bold">{id}</span>
        </div>
        <p className={`ml-16 text-lg leading-6 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{name}</p>
      </dt>
      <dd className={`mt-2 ml-16 text-base ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{description}</dd>
    </motion.div>
  )
}

export default Step