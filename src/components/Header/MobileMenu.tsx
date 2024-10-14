import React from 'react'
import { X } from 'lucide-react'
import NavItem from './NavItem'
import { useTheme } from '../../context/ThemeContext'

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { darkMode } = useTheme()

  if (!isOpen) return null

  return (
    <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-gray-800 divide-y-2 divide-gray-50 dark:divide-gray-700">
        <div className="pt-5 pb-6 px-5">
          <div className="flex items-center justify-between">
            <div>
              <a href="#" className="text-blue-600 dark:text-blue-400 text-2xl font-bold">StudentVoice</a>
            </div>
            <div className="-mr-2">
              <button
                type="button"
                className="bg-white dark:bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                onClick={onClose}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-6">
            <nav className="grid gap-y-8">
              <NavItem href="#">Features</NavItem>
              <NavItem href="#">How It Works</NavItem>
              <NavItem href="#">Success Stories</NavItem>
              <NavItem href="#">Contact</NavItem>
            </nav>
          </div>
        </div>
        <div className="py-6 px-5 space-y-6">
          <div>
            <a href="#" className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">Sign up</a>
            <p className="mt-6 text-center text-base font-medium text-gray-500 dark:text-gray-400">
              Existing user?
              <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"> Sign in </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu