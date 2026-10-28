import { motion } from 'motion/react'

function Loader() {
  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      role="status"
      aria-label="Loading AI Cyberverse"
    >
      <div className="loader__inner">
        <p className="loader__title">
          AI <span className="gradient-text">CYBERVERSE</span>
        </p>
        <div className="loader__bar">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </div>
        <p className="loader__text">loading interface...</p>
      </div>
    </motion.div>
  )
}

export default Loader