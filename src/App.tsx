import { useState, useEffect, useRef, useCallback } from 'react'

import './App.css'
import Particles from './components/Particles'
import CursorTrail from './components/CursorTrail'
import Confetti from './components/Confetti'
import Toast from './components/Toast'
import KonamiEasterEgg from './components/KonamiEasterEgg'
import { useScrollReveal } from './hooks/useScrollReveal'

function App() {
  const [tickers, setTickers] = useState([
    { name: 'BTC/USDT', value: 67432.50, change: -3.4 },
    { name: 'ETH/USDT', value: 3521.80, change: 3.8 },
    { name: 'SOL/USDT', value: 178.45, change: -1.3 },
    { name: 'EUR/USD', value: 1.0847, change: 0.4 },
    { name: 'GOLD', value: 2341.20, change: 2.1 }
  ])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [toasts, setToasts] = useState<{id: number, message: string, type: string}[]>([])
  const [statsVisible, setStatsVisible] = useState(false)
  const fullText = 'Твой первый миллион'
  const typingRef = useRef<number | null>(null)

  const statsRef = useScrollReveal(() => setStatsVisible(true))
  const featuresRef = useScrollReveal()
  const ctaRef = useScrollReveal()

  // Typing effect
  useEffect(() => {
    let index = 0
    const type = () => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
        typingRef.current = window.setTimeout(type, 80)
      }
    }
    const startDelay = window.setTimeout(type, 500)
    return () => {
      clearTimeout(startDelay)
      if (typingRef.current) clearTimeout(typingRef.current)
    }
  }, [])

  // Ticker updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers(prev => prev.map(ticker => {
        const change = (Math.random() * 0.6 - 0.3)
        let newChange = ticker.change + change
        newChange = Math.max(-10, Math.min(10, newChange))

        let newValue = ticker.value
        if (ticker.name.includes('BTC')) newValue += (Math.random() * 200 - 100)
        else if (ticker.name.includes('ETH')) newValue += (Math.random() * 20 - 10)
        else if (ticker.name.includes('SOL')) newValue += (Math.random() * 5 - 2.5)
        else if (ticker.name.includes('EUR')) newValue += (Math.random() * 0.002 - 0.001)
        else newValue += (Math.random() * 10 - 5)

        return {
          ...ticker,
          value: parseFloat(newValue.toFixed(ticker.name.includes('EUR') ? 4 : 2)),
          change: parseFloat(newChange.toFixed(1))
        }
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Stats counter
  const [stats, setStats] = useState({ money: 0, traders: 0 })
  const TARGET_MONEY = 14500000
  const TARGET_TRADERS = 342

  useEffect(() => {
    if (!statsVisible) return
    const duration = 2000
    const steps = 60
    const stepTime = duration / steps
    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setStats({
        money: Math.floor(TARGET_MONEY * easeOut),
        traders: Math.floor(TARGET_TRADERS * easeOut)
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setStats({ money: TARGET_MONEY, traders: TARGET_TRADERS })
      }
    }, stepTime)

    return () => clearInterval(interval)
  }, [statsVisible])

  // Toast system
  const addToast = useCallback((message: string, type: string = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }, [])

  // Random toast notifications (fake activity)
  useEffect(() => {
    const names = ['Алексей', 'Дмитрий', 'Мария', 'Иван', 'Ольга', 'Сергей', 'Анна', 'Максим']
    const actions = ['вывел(а) 15,000₽', 'вывел(а) 42,000₽', 'вывел(а) 8,500₽', 'вывел(а) 120,000₽', 'вывел(а) 67,000₽']

    const interval = setInterval(() => {
      const name = names[Math.floor(Math.random() * names.length)]
      const action = actions[Math.floor(Math.random() * actions.length)]
      addToast(`${name} ${action}`, 'success')
    }, 8000)

    return () => clearInterval(interval)
  }, [addToast])

  const handleCTAClick = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
    setTimeout(() => {
      window.location.href = "https://eda.yandex.ru/partner/rabota"
    }, 1500)
  }

  return (
    <>
      <Particles />
      <CursorTrail />
      {showConfetti && <Confetti />}
      <KonamiEasterEgg />

      {/* Toast notifications */}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast key={toast.id} message={toast.message} type={toast.type} />
        ))}
      </div>

      {/* Mobile navbar */}
      <nav className="mobile-navbar">
        <div className="navbar-brand">TRADERS</div>
        <button
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className={`mobile-content ${isMenuOpen ? 'open' : ''}`}>
        {/* Тикер */}
        <section id="upstroke">
          <div className='ticker-container'>
            {tickers.map((ticker, index) => (
              <div key={index} className='ticker-item'>
                <h2>{ticker.name}</h2>
                <span className={`ticker-value ${ticker.change >= 0 ? 'green' : 'red'}`}>
                  {ticker.name.includes('EUR') ? ticker.value.toFixed(4) : ticker.value.toLocaleString('en-US')}
                </span>
                <span className={`ticker-change ${ticker.change >= 0 ? 'green' : 'red'}`}>
                  {ticker.change >= 0 ? '▲' : '▼'} {Math.abs(ticker.change)}%
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Статистика */}
        <section id="stats" ref={statsRef as any}>
          <div className='stats-container'>
            <div className='stat-item'>
              <div className='stat-number'>
                {stats.money.toLocaleString('ru-RU')} ₽
              </div>
              <div className='stat-label'>Выведено участниками</div>
            </div>
            <div className='stat-divider'></div>
            <div className='stat-item'>
              <div className='stat-number'>
                {stats.traders}
              </div>
              <div className='stat-label'>Активных трейдеров</div>
            </div>
            <div className='stat-divider'></div>
            <div className='stat-item'>
              <div className='stat-number glow-text'>
                5 мин
              </div>
              <div className='stat-label'>На регистрацию</div>
            </div>
          </div>
        </section>
      </div>

      {/* Hero секция */}
      <section id="center">
        <div className="hero-content">
          <h1 className="hero-title">TRADERS</h1>
          <p className="hero-subtitle">
            {typedText}
            <span className="cursor-blink">|</span>
          </p>
          <button
            type="button"
            className="btn scroll-trigger"
            onClick={() => {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            ↓ Узнать секрет миллиона ↓
          </button>
        </div>
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </div>
      </section>

      {/* Features секция */}
      <section id="features" ref={featuresRef as any} className="reveal-section">
        <h2>Почему стоит начать?</h2>
        <div className="cards">
          <div className="card card-reveal">
            <div className="card-icon">🚀</div>
            <h3>Быстрый старт</h3>
            <p>Регистрация занимает всего 5 минут</p>
            <div className="card-shine"></div>
          </div>
          <div className="card card-reveal" style={{ animationDelay: '0.1s' }}>
            <div className="card-icon">💰</div>
            <h3>Высокий доход</h3>
            <p>Выплаты каждый день без задержек</p>
            <div className="card-shine"></div>
          </div>
          <div className="card card-reveal" style={{ animationDelay: '0.2s' }}>
            <div className="card-icon">📱</div>
            <h3>Удобное приложение</h3>
            <p>Управляйте заработком с телефона</p>
            <div className="card-shine"></div>
          </div>
          <div className="card card-reveal" style={{ animationDelay: '0.3s' }}>
            <div className="card-icon">💸</div>
            <h3>Без вложений</h3>
            <p>Твой первый старт бесплатен!</p>
            <div className="card-shine"></div>
          </div>
        </div>
      </section>

      {/* Live activity section */}
      <section id="live-activity" className="reveal-section">
        <h2>🔴 Активность в реальном времени</h2>
        <div className="activity-feed">
          <LiveActivityFeed />
        </div>
      </section>

      {/* CTA секция */}
      <section id="cta" ref={ctaRef as any} className="reveal-section">
        <div className="cta-content">
          <h1>Готов к действию?</h1>
          <p>Не упусти свой шанс. Начни получать миллионы уже сегодня.</p>
          <button
            type="button"
            className="btn btn-cta"
            onClick={handleCTAClick}
          >
            <span className="btn-text">🔥 Стать партнером</span>
            <span className="btn-glow"></span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer">
        <div className="footer-content">
          <div className="footer-brand">TRADERS</div>
          <p className="footer-text">© 2026 TRADERS. Все права защищены.</p>
          <div className="footer-links">
            <span>Политика конфиденциальности</span>
            <span>Условия использования</span>
          </div>
        </div>
      </footer>
    </>
  )
}

// Live Activity Feed component
function LiveActivityFeed() {
  const [activities, setActivities] = useState([
    { id: 1, user: 'Алексей М.', action: 'вывел', amount: '15,000₽', time: '2 мин назад', avatar: '👨' },
    { id: 2, user: 'Мария К.', action: 'вывела', amount: '42,000₽', time: '5 мин назад', avatar: '👩' },
    { id: 3, user: 'Дмитрий В.', action: 'вывел', amount: '8,500₽', time: '8 мин назад', avatar: '👨' },
    { id: 4, user: 'Ольга С.', action: 'вывела', amount: '120,000₽', time: '12 мин назад', avatar: '👩' },
    { id: 5, user: 'Иван П.', action: 'вывел', amount: '67,000₽', time: '15 мин назад', avatar: '👨' },
  ])

  useEffect(() => {
    const names = ['Алексей', 'Мария', 'Дмитрий', 'Ольга', 'Иван', 'Сергей', 'Анна', 'Максим', 'Елена', 'Павел']
    const surnames = ['М.', 'К.', 'В.', 'С.', 'П.', 'Л.', 'Н.', 'Д.', 'Р.', 'Б.']
    const amounts = ['15,000₽', '42,000₽', '8,500₽', '120,000₽', '67,000₽', '23,000₽', '95,000₽', '31,000₽']
    const avatars = ['👨', '👩', '🧑', '👨‍💼', '👩‍💼']

    const interval = setInterval(() => {
      const newActivity = {
        id: Date.now(),
        user: `${names[Math.floor(Math.random() * names.length)]} ${surnames[Math.floor(Math.random() * surnames.length)]}`,
        action: Math.random() > 0.5 ? 'вывел' : 'вывела',
        amount: amounts[Math.floor(Math.random() * amounts.length)],
        time: 'только что',
        avatar: avatars[Math.floor(Math.random() * avatars.length)]
      }
      setActivities(prev => [newActivity, ...prev.slice(0, 4)])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="activity-list">
      {activities.map((activity, index) => (
        <div
          key={activity.id}
          className="activity-item"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <span className="activity-avatar">{activity.avatar}</span>
          <div className="activity-info">
            <span className="activity-user">{activity.user}</span>
            <span className="activity-action">{activity.action} <strong className="activity-amount">{activity.amount}</strong></span>
          </div>
          <span className="activity-time">{activity.time}</span>
        </div>
      ))}
    </div>
  )
}

export default App
