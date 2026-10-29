import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data/navLinks'
import { useActiveSection } from '../hooks/useActiveSection'
import './Navbar.css'

const sectionIds = navLinks.map((link) => link.id)

function Navbar() {
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="navbar">
      <a href="#home" className="navbar__logo">
        AI<span>CYBERVERSE</span>
      </a>

      <button
        className="navbar__toggle"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav aria-label="Main">
        <ul id="nav-links" className={`navbar__links ${open ? 'is-open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={active === link.id ? 'is-active' : ''}
                onClick={() => setOpen(false)}
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="navbar__indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar