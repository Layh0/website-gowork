import { useEffect, useRef } from 'react'

export default function CursorTrail() {
  const trailRef = useRef<HTMLDivElement>(null)
  const dots = useRef<{ x: number; y: number; life: number }[]>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      dots.current.push({ x: e.clientX, y: e.clientY, life: 1 })
      if (dots.current.length > 20) {
        dots.current.shift()
      }
    }

    const animate = () => {
      if (!trailRef.current) return

      dots.current.forEach(dot => {
        dot.life -= 0.03
      })
      dots.current = dots.current.filter(dot => dot.life > 0)

      trailRef.current.innerHTML = dots.current
        .map(dot => {
          const size = dot.life * 8
          const opacity = dot.life * 0.6
          return `<div style="
            position: fixed;
            left: ${dot.x - size/2}px;
            top: ${dot.y - size/2}px;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(139,92,246,${opacity}), transparent);
            pointer-events: none;
            z-index: 9999;
          "></div>`
        })
        .join('')

      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return <div ref={trailRef} className="cursor-trail" />
}
