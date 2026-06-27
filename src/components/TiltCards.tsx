'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Adds the mouse-tracking "gravity" tilt + parallax + dynamic shadow to every
 * .card on the page. Re-binds on route changes. Respects reduced-motion.
 */
export function TiltCards() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const MAX = 7
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.card'))
    const cleanups: Array<() => void> = []

    cards.forEach((card) => {
      const img = card.querySelector<HTMLElement>('.ph .img')
      let raf = 0

      const onMove = (e: PointerEvent) => {
        const r = card.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        if (raf) cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => {
          card.style.transition = 'transform .08s linear, box-shadow .2s ease'
          card.style.transform = `perspective(1200px) rotateY(${px * MAX}deg) rotateX(${-py * MAX}deg) translateY(-6px) scale(1.012)`
          card.style.boxShadow = `${-px * 30}px ${22 + py * 12}px 60px -26px rgba(20,17,59,.5)`
          if (img) img.style.transform = `scale(1.09) translate(${-px * 16}px, ${-py * 16}px)`
        })
      }
      const onLeave = () => {
        if (raf) cancelAnimationFrame(raf)
        card.style.transition = 'transform .5s cubic-bezier(.22,.61,.36,1), box-shadow .5s ease'
        card.style.transform = ''
        card.style.boxShadow = ''
        if (img) img.style.transform = ''
      }

      card.addEventListener('pointermove', onMove)
      card.addEventListener('pointerleave', onLeave)
      cleanups.push(() => {
        card.removeEventListener('pointermove', onMove)
        card.removeEventListener('pointerleave', onLeave)
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [pathname])

  return null
}
