import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'

function ScrollGlow() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const yA = useTransform(scrollYProgress, [0, 1], ['0vh', '-70vh'])
  const xA = useTransform(scrollYProgress, [0, 1], ['0vw', '30vw'])
  const yB = useTransform(scrollYProgress, [0, 1], ['0vh', '60vh'])

  if (reduce) return null

  return (
    <div className="scroll-glow" aria-hidden="true">
      <motion.span
        className="scroll-glow__blob scroll-glow__blob--a"
        style={{ x: xA, y: yA }}
      />
      <motion.span
        className="scroll-glow__blob scroll-glow__blob--b"
        style={{ y: yB }}
      />
    </div>
  )
}

export default ScrollGlow