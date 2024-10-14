import React from 'react'

const steps = [
  { id: '01', name: 'Sign Up', description: 'Create an account using your school email address.' },
  { id: '02', name: 'Join Discussions', description: 'Participate in ongoing conversations or start new topics.' },
  { id: '03', name: 'Create Proposals', description: 'Draft and submit proposals for changes you want to see.' },
  { id: '04', name: 'Vote and Sign', description: 'Support proposals by voting and signing digital petitions.' },
  { id: '05', name: 'Track Progress', description: 'Follow the journey of proposals from submission to implementation.' },
]

const HowItWorks = () => {
  return (
    <div className="py-16 bg-gray-50 overflow-hidden lg:py-24">
      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <svg
          className="hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width={404} height={784} fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)" />
        </svg>

        <div className="relative">
          <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            How StudentVoice Works
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
            Making your voice heard is easy with StudentVoice. Follow these simple steps to start creating change on your campus.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative">
            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
              From idea to action
            </h3>
            <p className="mt-3 text-lg text-gray-500">
              StudentVoice streamlines the process of turning your ideas into tangible changes on campus. Here's how you can get started:
            </p>

            <dl className="mt-10 space-y-10">
              {steps.map((step) => (
                <div key={step.id} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <span className="text-lg font-bold">{step.id}</span>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{step.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{step.description}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
            <svg
              className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
              width={784}
              height={404}
              fill="none"
              viewBox="0 0 784 404"
            >
              <defs>
                <pattern
                  id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={784} height={404} fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)" />
            </svg>
            <img
              className="relative mx-auto"
              width={490}
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="Student council meeting"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks