import { useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import Navbar from './components/Navbar'
import Loader from './components/Loader'
import CursorGlow from './components/CursorGlow'
import ScrollProgress from './components/ScrollProgress'
import Hero from './sections/Hero'
import About from './sections/About'
import AIUniverse from './sections/AIUniverse'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'

// Show the loader only once per browser session, and never with reduced motion
function shouldBoot() {
  try {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return !reduce && !sessionStorage.getItem('booted')
  } catch {
    return false
  }
}

function App() {
  const [booting, setBooting] = useState(shouldBoot)

  useEffect(() => {
    if (!booting) return
    const id = setTimeout(() => {
      setBooting(false)
      try {
        sessionStorage.setItem('booted', '1')
      } catch {
        // storage can be blocked, that's fine
      }
    }, 1800)
    return () => clearTimeout(id)
  }, [booting])

  return (
    <>
      <AnimatePresence>{booting && <Loader />}</AnimatePresence>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <AIUniverse />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  )
}

export default App