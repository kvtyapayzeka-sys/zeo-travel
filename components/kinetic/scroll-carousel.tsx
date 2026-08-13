'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ScrollCarouselProps {
  children: React.ReactNode
  trackClassName?: string
  arrowClassName?: string
}

export function ScrollCarousel({ children, trackClassName = '', arrowClassName = '' }: ScrollCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div ref={trackRef} className={`no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth ${trackClassName}`}>
        {children}
      </div>
      <button
        type="button"
        aria-label="Geri kaydır"
        onClick={() => scroll(-1)}
        className={`absolute left-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur transition-colors sm:flex ${arrowClassName}`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="İleri kaydır"
        onClick={() => scroll(1)}
        className={`absolute right-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur transition-colors sm:flex ${arrowClassName}`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
