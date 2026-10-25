import './Services.css'

export default function Services() {
  const services = [
    {
      title: 'Разработка на Django + DRF',
      description: 'API, админка, модели, миграции, валидация, кэширование, Celery-задачи.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
          <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="12" y1="6" x2="12" y2="18" stroke="currentColor" strokeWidth="2" />
          <polyline points="9 12 12 9 15 12" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'React + Vite фронтенд',
      description: 'SPA, роутинг, формы, работа с API, оптимизация бандла, SSR-заготовки.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
          <polygon points="12 2 2 9 12 16 22 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="12" y1="5" x2="12" y2="13" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'Интеграция Django + React',
      description: 'CORS, прокси в Vite, CSRF/JWT, единая сборка, деплой на одном домене.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M7 12L12 7L17 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="7" x2="12" y2="17" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'Базы данных и миграции',
      description: 'PostgreSQL, индексы, оптимизации, миграции Django, seed-данные.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path d="M8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12Z" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <section id="services-section" className="services-section">
      <div className="container">
        <h2 className="section-title">Услуги</h2>
        <p className="section-subtitle">
          Делаю не просто «сайт», а продукт: архитектура, поддержка, масштабирование.
        </p>
        <div className="services-grid">
          {services.map((service, idx) => (
            <div key={idx} className="service-card">
              <div className="service-icon-wrapper">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
