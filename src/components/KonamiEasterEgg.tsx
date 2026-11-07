import { useEffect, useState } from 'react'

export default function KonamiEasterEgg() {
  const [activated, setActivated] = useState(false)
  const [sequence, setSequence] = useState<string[]>([])
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...sequence, e.code].slice(-10)
      setSequence(newSequence)

      if (newSequence.length === 10 && newSequence.every((key, i) => key === konamiCode[i])) {
        setActivated(true)
        setTimeout(() => setActivated(false), 5000)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [sequence])

  if (!activated) return null

  return (
    <div className="easter-egg-overlay">
      <div className="easter-egg-content">
        <div className="easter-egg-emoji">🎉🎮🎉</div>
        <h2>KONAMI CODE ACTIVATED!</h2>
        <p>Ты настоящий хакер! Вот тебе секретный бонус: +1000 к удаче 🍀</p>
        <div className="easter-egg-rain">
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className="rain-emoji"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              {['💎', '💰', '🚀', '⭐', '🎯'][Math.floor(Math.random() * 5)]}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
