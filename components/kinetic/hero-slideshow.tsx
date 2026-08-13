'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

interface HeroSlideshowProps {
  images: { src: string; alt: string }[]
  interval?: number
}

export function HeroSlideshow({ images, interval = 5000 }: HeroSlideshowProps) {
  const [index, setIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (images.length < 2 || reduceMotion) return
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), interval)
    return () => clearInterval(id)
  }, [images.length, interval, reduceMotion])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={reduceMotion ? { opacity: 0 } : { x: '100%' }}
          animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { x: '-100%' }}
          transition={{ duration: reduceMotion ? 0.4 : 1.1, ease: [0.65, 0, 0.35, 1] }}
        >
          <Image
            src={images[index].src}
            alt={images[index].alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
