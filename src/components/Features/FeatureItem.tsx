import React from 'react'
import { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface FeatureItemProps {
  name: string;
  description: string;
  Icon: LucideIcon;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ name, description, Icon }) => (
  <motion.div 
    className="relative p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <dt>
      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">{name}</p>
    </dt>
    <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">{description}</dd>
  </motion.div>
)

export default FeatureItem