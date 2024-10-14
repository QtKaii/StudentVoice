import React, { useState, useEffect } from 'react'
import { Menu, Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import NavMenu from './NavMenu'
import MobileMenu from './MobileMenu'
import { motion, useAnimation } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const controls = useAnimation()
  const { darkMode, toggleDarkMode } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 50 && !isScrolled) {
        setIsScrolled(true)
        controls.start({ backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)' })
      } else if (scrollPosition <= 50 && isScrolled) {
        setIsScrolled(false)
        controls.start({ backgroundColor: darkMode ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)', backdropFilter: 'blur(0px)' })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolled, controls, darkMode])

  useEffect(() => {
    controls.start({ backgroundColor: darkMode ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)' })
  }, [darkMode, controls])

  return (
    <motion.header 
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${darkMode ? 'dark:bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
      initial={false}
      animate={controls}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Logo />
          </div>
          <div className="-mr-2 -my-2 md:hidden flex items-center">
            <button
              onClick={toggleDarkMode}
              className={`rounded-md p-2 inline-flex items-center justify-center ${
                darkMode 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-500 hover:text-gray-600 hover:bg-gray-100'
              } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 mr-2`}
            >
              {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            <button
              type="button"
              className={`rounded-md p-2 inline-flex items-center justify-center ${
                darkMode 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-500 hover:text-gray-600 hover:bg-gray-100'
              } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <NavMenu />
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <button
              onClick={toggleDarkMode}
              className={`rounded-md p-2 inline-flex items-center justify-center ${
                darkMode 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-500 hover:text-gray-600 hover:bg-gray-100'
              } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 mr-4`}
            >
              {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            <Link to="/signin" className={`whitespace-nowrap text-base font-medium ${
              darkMode 
                ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            } px-3 py-2 rounded-md`}>
              Sign in
            </Link>
            <Link
              to="/signup"
              className={`ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                darkMode 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </motion.header>
  )
}

export default Header