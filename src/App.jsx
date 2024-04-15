import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import './App.css'
import './snow.css'

import Home from './views/Home'
import Builder from './views/Builder'

function App() {

  return (
    <>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/build" element={<Builder />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
