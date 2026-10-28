import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import { navLinks } from './data/navLinks'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {navLinks
          .filter((link) => link.id !== 'home')
          .map((link) => (
            <section key={link.id} id={link.id} className="section">
              <h2 className="gradient-text">{link.label}</h2>
            </section>
          ))}
      </main>
    </>
  )
}

export default App