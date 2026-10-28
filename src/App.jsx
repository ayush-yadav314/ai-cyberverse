import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import AIUniverse from './sections/AIUniverse'
import { navLinks } from './data/navLinks'

function App() {
  return (
    <>
      <Navbar />
      <main>
        {navLinks.map((link) => {
          if (link.id === 'home') return <Hero key={link.id} />
          if (link.id === 'universe') return <AIUniverse key={link.id} />
          return (
            <section key={link.id} id={link.id} className="section">
              <h2 className="gradient-text">{link.label}</h2>
            </section>
          )
        })}
      </main>
    </>
  )
}

export default App