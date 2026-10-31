import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import './NeuralOrb.css'

const COLORS = ['#22d3ee', '#8b5cf6', '#ec4899']

// Spread points evenly on a sphere (Fibonacci sphere)
function createNodes(count) {
  const nodes = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    nodes.push({
      x: Math.cos(theta) * r,
      y,
      z: Math.sin(theta) * r,
      color: COLORS[i % COLORS.length],
    })
  }
  return nodes
}

function NeuralOrb() {
  const canvasRef = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const small = window.innerWidth < 768
    const nodes = createNodes(small ? 45 : 90)

    // Fewer nodes means a slightly longer link distance keeps the same look
    const linkDist = small ? 0.63 : 0.61
    const linkSq = linkDist * linkDist

    // Reused every frame, so no new objects are created while animating
    const pts = nodes.map((n) => ({
      rx: 0,
      ry: 0,
      rz: 0,
      px: 0,
      py: 0,
      scale: 1,
      color: n.color,
    }))

    const mouse = { x: 0, y: 0 }
    const smooth = { x: 0, y: 0 }
    let angle = 0
    let w = 0
    let h = 0
    let raf = 0
    let last = 0
    let visible = true

    function draw() {
      ctx.clearRect(0, 0, w, h)

      smooth.x += (mouse.x - smooth.x) * 0.05
      smooth.y += (mouse.y - smooth.y) * 0.05

      const cx = w / 2
      const cy = h / 2
      const radius = Math.min(w, h) * 0.36
      const rotY = angle + smooth.x * 0.6
      const rotX = smooth.y * 0.4
      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)

      // Soft glow behind the orb
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.4)
      glow.addColorStop(0, 'rgba(139, 92, 246, 0.35)')
      glow.addColorStop(0.5, 'rgba(34, 211, 238, 0.10)')
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, w, h)

      // Rotate every node, then project it to 2D
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const p = pts[i]
        const x1 = n.x * cosY - n.z * sinY
        const z1 = n.x * sinY + n.z * cosY
        const y2 = n.y * cosX - z1 * sinX
        const z2 = n.y * sinX + z1 * cosX
        const scale = 1 + z2 * 0.25
        p.rx = x1
        p.ry = y2
        p.rz = z2
        p.scale = scale
        p.px = cx + x1 * radius * scale
        p.py = cy + y2 * radius * scale
      }

      // Connections between nearby nodes
      ctx.lineWidth = 1
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i]
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j]
          const dx = a.rx - b.rx
          const dy = a.ry - b.ry
          const dz = a.rz - b.rz
          const d2 = dx * dx + dy * dy + dz * dz
          if (d2 < linkSq) {
            const d = Math.sqrt(d2)
            const depth = ((a.rz + b.rz) / 2 + 1) / 2
            const alpha = (1 - d / linkDist) * 0.5 * (0.3 + depth * 0.7)
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.px, a.py)
            ctx.lineTo(b.px, b.py)
            ctx.stroke()
          }
        }
      }

      // Nodes (closer ones are bigger and brighter)
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        ctx.globalAlpha = 0.35 + ((p.rz + 1) / 2) * 0.65
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.px, p.py, 1.2 + p.scale * 1.4, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    function resize() {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (reduce) draw()
    }

    function loop(now) {
      if (!visible) {
        raf = 0
        return
      }
      raf = requestAnimationFrame(loop)

      // On small screens, draw at about 30 frames per second
      if (small && now - last < 33) return
      last = now

      angle += small ? 0.006 : 0.003
      draw()
    }

    function onPointerMove(e) {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    if (reduce) {
      draw()
    } else {
      window.addEventListener('pointermove', onPointerMove)
      raf = requestAnimationFrame(loop)
    }

    // Pause the animation when the orb is off-screen
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !raf && !reduce) raf = requestAnimationFrame(loop)
    })
    visibilityObserver.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
    }
  }, [reduce])

  return (
    <canvas
      ref={canvasRef}
      className="neural-orb"
      role="img"
      aria-label="Illustrative animation of a glowing neural network orb"
    />
  )
}

export default NeuralOrb