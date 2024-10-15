import React from 'react'
import { motion } from 'framer-motion'
import FeatureItem from './FeatureItem'
import { features } from './featuresData'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

const FeatureList: React.FC = () => {
  return (
    <motion.div 
      className="mt-10 grid gap-10 md:grid-cols-2"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {features.map((feature) => (
        <motion.div key={feature.name} variants={item}>
          <FeatureItem {...feature} />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default FeatureList
