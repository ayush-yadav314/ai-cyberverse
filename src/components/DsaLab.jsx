import { useEffect, useMemo, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import {
  buildSteps,
  javaCode,
  sampleArray,
  targets,
} from '../data/binarySearch'
import './DsaLab.css'

const maxValue = Math.max(...sampleArray)

function DsaLab() {
  const [target, setTarget] = useState(23)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  const steps = useMemo(() => buildSteps(sampleArray, target), [target])
  const step = steps[index]
  const last = index === steps.length - 1
  const running = playing && !last

  // Advance one step every 1.1 seconds while playing
  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setIndex((i) => Math.min(i + 1, steps.length - 1))
    }, 1100)
    return () => clearInterval(id)
  }, [running, steps.length])

  function selectTarget(value) {
    setTarget(value)
    setIndex(0)
    setPlaying(false)
  }

  function togglePlay() {
    if (last) {
      setIndex(0)
      setPlaying(true)
    } else {
      setPlaying(!playing)
    }
  }

  function stepOnce() {
    setPlaying(false)
    setIndex((i) => Math.min(i + 1, steps.length - 1))
  }

  function reset() {
    setPlaying(false)
    setIndex(0)
  }

  return (
    <section className="dsa" aria-labelledby="dsa-title">
      <p className="dsa__eyebrow">&gt; DSA LAB</p>
      <h3 id="dsa-title" className="dsa__title">
        Binary search in Java
      </h3>
      <p className="dsa__lead">
        A visual walkthrough of one algorithm I practise. Pick a target, then
        step through the code and watch the search range shrink.
      </p>

      <div className="dsa__targets" role="group" aria-label="Choose a target">
        <span>TARGET</span>
        {targets.map((value) => (
          <button
            key={value}
            type="button"
            className={value === target ? 'is-active' : ''}
            aria-pressed={value === target}
            onClick={() => selectTarget(value)}
          >
            {value}
            {!sampleArray.includes(value) ? ' (absent)' : ''}
          </button>
        ))}
      </div>

      <ol className="dsa__code" aria-label="Java code">
        {javaCode.map((text, i) => (
          <li
            key={text}
            className={`dsa__line ${i === step.line ? 'is-active' : ''}`}
          >
            <span className="dsa__ln" aria-hidden="true">
              {i + 1}
            </span>
            <code>{text}</code>
          </li>
        ))}
      </ol>

      <div
        className="dsa__bars"
        role="img"
        aria-label={`Sorted array: ${sampleArray.join(', ')}. ${step.note}`}
      >
        {sampleArray.map((value, i) => {
          const inRange = i >= step.lo && i <= step.hi
          const isMid = i === step.mid
          const isFound = step.state === 'found' && isMid
          const tags = []
          if (i === step.lo) tags.push('lo')
          if (i === step.mid) tags.push('mid')
          if (i === step.hi) tags.push('hi')

          return (
            <div
              key={value}
              className={`dsa__col ${inRange ? 'is-range' : ''} ${
                isMid ? 'is-mid' : ''
              } ${isFound ? 'is-found' : ''}`}
            >
              <div className="dsa__plot">
                <span
                  className="dsa__fill"
                  style={{ height: `${(value / maxValue) * 100}%` }}
                />
              </div>
              <span className="dsa__value">{value}</span>
              <span className="dsa__index">{i}</span>
              <span className="dsa__tags">
                {tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </span>
            </div>
          )
        })}
      </div>

      <p className={`dsa__note is-${step.state}`} aria-live="polite">
        <strong>
          Step {index + 1} / {steps.length}:
        </strong>{' '}
        {step.note}
      </p>

      <div className="dsa__controls">
        <button type="button" onClick={togglePlay}>
          {running ? <Pause size={16} /> : <Play size={16} />}
          {running ? 'Pause' : last ? 'Replay' : 'Play'}
        </button>
        <button type="button" onClick={stepOnce} disabled={last}>
          Step
        </button>
        <button type="button" onClick={reset}>
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      <p className="dsa__fine">
        Illustrative walkthrough of a standard binary search. It is not a
        record of problems solved.
      </p>
    </section>
  )
}

export default DsaLab