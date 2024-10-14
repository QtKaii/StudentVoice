import React from 'react'
import NavItem from './NavItem'
import { useTheme } from '../../context/ThemeContext'

const NavMenu = () => {
  const { darkMode } = useTheme();

  return (
    <nav className="hidden md:flex space-x-10">
      <NavItem href="#" darkMode={darkMode}>Features</NavItem>
      <NavItem href="#" darkMode={darkMode}>How It Works</NavItem>
      <NavItem href="#" darkMode={darkMode}>Success Stories</NavItem>
      <NavItem href="#" darkMode={darkMode}>Contact</NavItem>
    </nav>
  )
}

export default NavMenu