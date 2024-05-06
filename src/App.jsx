import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import './App.css'

import Builder from './views/Builder'
import Settings from './views/Settings'

function App() {
  useEffect(() => {
    const selectedTheme = localStorage.getItem('client-theme')
    if (selectedTheme) {
      document.documentElement.classList.add(selectedTheme)
    } else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Builder />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
