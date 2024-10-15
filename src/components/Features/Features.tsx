import React from 'react'
import FeaturesHeader from './FeaturesHeader'
import FeatureList from './FeatureList'

const Features: React.FC = () => {
  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeaturesHeader />
        <FeatureList />
      </div>
    </div>
  )
}

export default Features
