import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [tickers, setTickers] = useState([
    { name: 'BTC/USDT', value: -3.4 },
    { name: 'ETH/USDT', value: 3.8 },
    { name: 'SOL/USDT', value: -1.3 },
    { name: 'EUR/USD', value: 0.4 },
    { name: 'GOLD', value: 2.1 }
  ])
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTickers(prev => prev.map(ticker => {
        const change = (Math.random() * 0.6 - 0.3)
        let newValue = ticker.value + change
        newValue = Math.max(-10, Math.min(10, newValue))
        return {
          ...ticker,
          value: parseFloat(newValue.toFixed(1))
        }
      }))
    }, 5000) 
    return () => clearInterval(interval)
  }, [])

  const [stats, setStats] = useState({
    money: 0,
    traders: 0
  })

  const TARGET_MONEY = 14500000
  const TARGET_TRADERS = 342

  useEffect(() => {
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
  }, [])
  
  return (
    <>
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
        
        {/* Тикер с котировками */}
        <section id="upstroke">
          <div className='ticker-container'>
            {tickers.map((ticker, index) => (
              <div key={index} className='ticker-item'>
                <h2>{ticker.name}</h2>
                <span className={ticker.value >= 0 ? 'green' : 'red'}>
                  {ticker.value >= 0 ? '+' : ''}{ticker.value}%
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Участники */}
        <section id="stats">
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
              <div className='stat-number'>
                5 мин
              </div>
              <div className='stat-label'>На регистрацию</div>
            </div>
          </div>
        </section>

      </div>
      
      {/* 1 секция */}
      <section id="center">
        <div>
          <h1>TRADERS</h1>
          <p>Твой первый миллион</p>
        </div>
        <button
          type="button"
          className="btn scroll-trigger"
          onClick={() => {
            document.getElementById('features').scrollIntoView({ 
              behavior: 'smooth' 
            });
          }}
        >
          ↓ Узнать секрет миллиона ↓
        </button>
      </section>

      {/* 2 секция */}
      <section id="features">
        <h2>Почему стоит начать?</h2>
        <div className="cards">
          <div className="card">
            <h3>🚀 Быстрый старт</h3>
            <p>Регистрация занимает всего 5 минут</p>
          </div>
          <div className="card">
            <h3>💰 Высокий доход</h3>
            <p>Выплаты каждый день без задержек</p>
          </div>
          <div className="card">
            <h3>📱 Удобное приложение</h3>
            <p>Управляйте заработком с телефона</p>
          </div>
          <div className="card">
            <h3>💸 Без вложений</h3>
            <p>Твой первый старт бесплатен!</p>
          </div>
        </div>
      </section>

      {/* 3 секция */}
      <section id="cta">
        <div className="cta-content">
          <h1>Готов к действию?</h1>
          <p>Не упусти свой шанс. Начни получать миллионы уже сегодня.</p>
          <button
            type="button"
            className="btn"
            onClick={() => {
              window.location.href = "https://eda.yandex.ru/partner/rabota";
            }}
          >
            Стать партнером
          </button>
        </div>
      </section>
    </>
  )
}

export default App