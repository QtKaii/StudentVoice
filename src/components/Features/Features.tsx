import React from 'react'
import { MessageSquare, Vote, FileText, Users } from 'lucide-react'
import FeatureItem from './FeatureItem'
import { motion } from 'framer-motion'

const features = [
  {
    name: 'Open Discussions',
    description: 'Engage in meaningful conversations with your peers on topics that matter to you.',
    Icon: MessageSquare,
  },
  {
    name: 'Proposal Voting',
    description: 'Vote on student-initiated proposals to show support for changes you want to see.',
    Icon: Vote,
  },
  {
    name: 'Digital Petitions',
    description: 'Your school email acts as a digital signature, giving weight to the causes you support.',
    Icon: FileText,
  },
  {
    name: 'Direct Communication',
    description: 'Bridge the gap between students and administration with a unified voice.',
    Icon: Users,
  },
]

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

const Features = () => {
  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase font-display">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl font-display">
            Empower your student experience
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            StudentVoice provides the tools you need to make your voice heard and create positive change on campus.
          </p>
        </div>
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
      </div>
    </div>
  )
}

export default Features