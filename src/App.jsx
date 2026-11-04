import './App.css'

function App() {
  return (
    <>
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
  Узнать секрет миллиона ↓
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