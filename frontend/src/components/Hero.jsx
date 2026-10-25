import './Hero.css'

export default function Hero() {
  
  return (
    <header className="hero">
      <div className="hero-code-bg" />
      <div className="container hero-content">
        <div className="hero-tag">Django 6.1.2 + DRF + React/Vite</div>
        <h1>Разрабатываю веб‑приложения на Django и React: API, админки, асинхронные задачи и LLM‑интеграции</h1>
        <p className="hero-subtitle">
          Создаю продукты, где бэкенд, фронтенд и автоматизация работают как единое целое
        </p>
        <div className="hero-actions">
          <a href='#contact' 
            className="btn-primary btn-lg"
            >Обсудить задачу</a>
          <button
            type="button"
            className="btn-secondary btn-lg"
            onClick={() => alert('Портфолио в разработке')}
          >
            Посмотреть стек
          </button>
        </div>
        <div className="hero-tech-stack">
          <a href='https://docs.djangoproject.com/en/6.1/'>Django 6.1.2</a>
          <a href='https://www.django-rest-framework.org/'>DRF</a>
          <a href='https://www.postgresql.org/docs/'>PostgreSQL</a>
          <a href='https://react.dev/'>React 18</a>
          <a href='https://vitejs.dev/'>Vite</a>
          <a href='https://nginx.org/en/docs/'>Nginx+Gunicorn</a>
          <a href='https://docs.github.com/en/actions'>GitHub Actions</a>
        </div>
      </div>
    </header>
  );
}

