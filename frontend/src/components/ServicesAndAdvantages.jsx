import './ServicesAndAdvantages.css'

export default function ServicesAndAdvantages() {
  const items = [
    // Услуги
    {
      type: 'service',
      title: 'Разработка на Django + DRF',
      description: 'API, админка, модели, миграции, валидация, кэширование, Celery-задачи. Django Admin, кастомные страницы, права доступа, логирование. Добавляю AI‑агентов: анализ требований, генерация текстов, структурирование данных, вывод JSON',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
          <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="12" y1="6" x2="12" y2="18" stroke="currentColor" strokeWidth="2" />
          <polyline points="9 12 12 9 15 12" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      type: 'service',
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
      type: 'service',
      title: 'Интеграция Django + React',
      description: 'CORS, прокси в Vite, CSRF/JWT, единая сборка, деплой на одном домене. ',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M7 12L12 7L17 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="7" x2="12" y2="17" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    // Преимущества
    {
      type: 'advantage',
      title: 'Надёжная архитектура',
      description:
        'Django даёт стабильность и безопасность, DRF — чистый API. Это база для продуктов, которые живут годами, а не только для MVP.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M12 6v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 10l4 4l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      type: 'advantage',
      title: 'Быстрый старт и админка из коробки',
      description:
        'С Django можно сразу показать заказчику CRUD, статистику и управление данными — без написания UI с нуля. ',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
          <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      type: 'advantage',
      title: 'Готовая инфраструктура',
      description:
        'Nginx + Gunicorn, PostgreSQL, GitHub Actions — стек, который сразу готов к деплою и масштабированию.Celery + Redis: рассылки, отчёты, парсинг, обработка файлов — без зависания интерфейса',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
          <line x1="8" y1="8" x2="16" y2="16" stroke="currentColor" strokeWidth="2" />
          <line x1="16" y1="8" x2="8" y2="16" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  return (
    <section id="services-and-advantages" className="services-and-advantages-section">
      <div className="container">
        <h2 className="section-title">Что делаю и почему это работает</h2>
        <p className="section-subtitle">
          3 ключевые услуги и 3 главных преимущества моего стека: Django 6.1.2 + DRF + React + PostgreSQL.
        </p>
        <div className="hybrid-grid">
          {items.map((item, idx) => (
            <div key={idx} className={`hybrid-card hybrid-card--${item.type}`}>
              <div className="hybrid-icon-wrapper">
                {item.icon}
              </div>
              <h3 className="hybrid-title">{item.title}</h3>
              <p className="hybrid-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
