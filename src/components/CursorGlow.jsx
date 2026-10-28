import { useEffect, useRef } from 'react'

function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const fineMouse = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (!fineMouse || reduce) return

    const el = ref.current
    let x = 0
    let y = 0
    let raf = 0

    function update() {
      raf = 0
      el.style.transform = `translate(${x - 200}px, ${y - 200}px)`
      el.style.opacity = '1'
    }

    function onMove(e) {
      x = e.clientX
      y = e.clientY
      if (!raf) raf = requestAnimationFrame(update)
    }

    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}

export default CursorGlow