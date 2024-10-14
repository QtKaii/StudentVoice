import React from 'react'
import { MessageSquare, VoteIcon, FileText, Users } from 'lucide-react'

const features = [
  {
    name: 'Open Discussions',
    description: 'Engage in meaningful conversations with your peers on topics that matter to you.',
    icon: MessageSquare,
  },
  {
    name: 'Proposal Voting',
    description: 'Vote on student-initiated proposals to show support for changes you want to see.',
    icon: VoteIcon,
  },
  {
    name: 'Digital Petitions',
    description: 'Your school email acts as a digital signature, giving weight to the causes you support.',
    icon: FileText,
  },
  {
    name: 'Direct Communication',
    description: 'Bridge the gap between students and administration with a unified voice.',
    icon: Users,
  },
]

const Features = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Empower your student experience
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            StudentVoice provides the tools you need to make your voice heard and create positive change on campus.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Features