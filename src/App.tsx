import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Features from './components/Features/Features'
import HowItWorks from './components/HowItWorks/HowItWorks'
import CallToAction from './components/CallToAction/CallToAction'
import Footer from './components/Footer/Footer'
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'
import { ThemeProvider } from './context/ThemeContext'
import { useTheme } from './context/ThemeContext'

function AppContent() {
  const { darkMode } = useTheme();

  return (
    <Router>
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Features />
                <HowItWorks />
                <CallToAction />
              </>
            } />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;