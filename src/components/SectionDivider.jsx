import { motion, useReducedMotion } from 'motion/react'

function SectionDivider() {
  const reduce = useReducedMotion()

  return (
    <div className="divider" aria-hidden="true">
      <motion.span
        className="divider__line"
        initial={reduce ? false : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  )
}

export default SectionDivider