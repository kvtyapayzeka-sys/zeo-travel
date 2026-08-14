'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface PhotoGalleryProps {
  images: string[]
  title: string
}

export function PhotoGallery({ images, title }: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const preview = images.slice(0, 3)
  const remaining = images.length - preview.length

  const close = () => setLightboxIndex(null)
  const prev = () => setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
  const next = () => setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length))

  useEffect(() => {
    if (lightboxIndex === null) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length))
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxIndex, images.length])

  return (
    <>
      <div className="grid grid-cols-4 gap-3">
        <button
          type="button"
          onClick={() => setLightboxIndex(0)}
          className="group col-span-4 aspect-[16/9] overflow-hidden border-2 border-zeo-ink md:col-span-2"
        >
          <img
            src={preview[0]}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </button>
        {preview.slice(1, 3).map((image, i) => {
          const index = i + 1
          const isLast = index === preview.length - 1
          return (
            <button
              key={image + index}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="group relative col-span-2 aspect-square overflow-hidden border-2 border-zeo-ink md:col-span-1"
            >
              <img
                src={image}
                alt={`${title} ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {isLast && remaining > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-zeo-ink/70">
                  <span className="text-[13px] font-bold uppercase tracking-[0.04em] text-white">
                    +{remaining} Fotoğraf
                  </span>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-zeo-ink/95 p-4"
          onClick={close}
        >
          <button
            type="button"
            aria-label="Kapat"
            onClick={close}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border-2 border-white/30 text-white transition-colors hover:border-zeo-coral hover:text-zeo-coral"
          >
            <X className="h-5 w-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Önceki fotoğraf"
                onClick={(e) => {
                  e.stopPropagation()
                  prev()
                }}
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border-2 border-white/30 text-white transition-colors hover:border-zeo-coral hover:text-zeo-coral sm:left-6"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Sonraki fotoğraf"
                onClick={(e) => {
                  e.stopPropagation()
                  next()
                }}
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border-2 border-white/30 text-white transition-colors hover:border-zeo-coral hover:text-zeo-coral sm:right-6"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <img
            src={images[lightboxIndex]}
            alt={`${title} ${lightboxIndex + 1}`}
            className="max-h-[85vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[12px] font-semibold uppercase tracking-[0.06em] text-white/70">
            {lightboxIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  )
}
