import { motion } from 'framer-motion'
import React from 'react'

export function AnimatedButton({className, i=0, duration=0.3, delay=0.3, children, onClick}) {
    const d = delay+duration;
    return (
        <motion.button
            className={className}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: duration, delay: d }}
            onClick={onClick}
        >
            {children}
        </motion.button>
    )
}
export function AnimatedDiv({className, i=0, duration=0.3, delay=0.3, children}) {
    const d = delay*duration;
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: duration, delay: d }}
        >
            {children}
        </motion.div>
    )
}
