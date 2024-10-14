import React from 'react'

const CallToAction = () => {
  return (
    <div className="bg-blue-700">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Ready to make a difference?</span>
          <span className="block">Join StudentVoice today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-blue-200">
          Be part of the change on your campus. Sign up now and start making your voice heard.
        </p>
        <a
          href="#"
          className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto"
        >
          Sign up with your school email
        </a>
      </div>
    </div>
  )
}

export default CallToAction