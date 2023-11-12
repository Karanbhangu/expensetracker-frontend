import React from 'react'
import { motion } from 'framer-motion'


const animiations = {
    initial: {opacity: 0, x:100},
    animate: {opacity: 1, x:0},
    exit: {opacity:0 , x: -100}
}
const AnimatedPage = ({children}) => {
  return (
    <motion.div variants={animiations} initial="initial" animate="animate" exit="exit">
        {children}
    </motion.div>
  )
}

export default AnimatedPage