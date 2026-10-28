import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import './HeroTerminal.css'

const lines = [
  '> perceive: user goal received',
  '> reason: breaking goal into subtasks',
  '> plan: [search, extract, summarize]',
  '> use_tool: browser.open(url)',
  '> observe: page loaded, DOM parsed',
  '> iterate: refining next action...',
]

function HeroTerminal() {
  const reduce = useReducedMotion()
  const [count, setCount] = useState(reduce ? lines.length : 0)

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= lines.length) {
          clearInterval(id)
          return c
        }
        return c + 1
      })
    }, 900)
    return () => clearInterval(id)
  }, [reduce])

  return (
    <div className="terminal">
      <div className="terminal__bar">
        <span className="terminal__dot" />
        <span className="terminal__dot" />
        <span className="terminal__dot" />
        <span className="terminal__title">agent.log</span>
      </div>
      <div className="terminal__body">
        {lines.slice(0, count).map((line) => (
          <p key={line}>{line}</p>
        ))}
        <span className="terminal__cursor" aria-hidden="true">
          _
        </span>
      </div>
      <p className="terminal__note">
        Illustrative simulation. Not a live AI system.
      </p>
    </div>
  )
}

export default HeroTerminal