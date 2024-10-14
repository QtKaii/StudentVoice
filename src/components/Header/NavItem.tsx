import React from 'react'

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  darkMode: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, children, darkMode }) => (
  <a 
    href={href} 
    className={`text-base font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
      darkMode
        ? 'text-gray-300 hover:text-white hover:bg-gray-700'
        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
    }`}
  >
    {children}
  </a>
)

export default NavItem