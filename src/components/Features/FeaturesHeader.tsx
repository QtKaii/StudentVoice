import React from 'react'

const FeaturesHeader: React.FC = () => {
  return (
    <div className="lg:text-center">
      <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase font-display">Features</h2>
      <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl font-display">
        Empower your student experience
      </p>
      <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
        StudentVoice provides the tools you need to make your voice heard and create positive change on campus.
      </p>
    </div>
  )
}

export default FeaturesHeader
