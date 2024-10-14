import React from 'react'

interface SocialIconProps {
  name: string;
  href: string;
  children: React.ReactNode;
}

const SocialIcon: React.FC<SocialIconProps> = ({ name, href, children }) => (
  <a href={href} className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
    <span className="sr-only">{name}</span>
    {children}
  </a>
)

export default SocialIcon