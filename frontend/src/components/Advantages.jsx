import './Advantages.css'

export default function Advantages() {
  const advantages = [
    {
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
      title: 'Быстрый старт и админка из коробки',
      description:
        'С Django можно сразу показать заказчику CRUD, статистику и управление данными — без написания UI с нуля.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
          <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'Производительность фронтенда',
      description:
        'React + Vite дают мгновенную сборку и быструю работу UI. Оптимизирую бандлы, чтобы сайт летал даже на слабых устройствах.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
          <path d="M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M5 12L12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'Готовая инфраструктура',
      description:
        'Nginx + Gunicorn, PostgreSQL, GitHub Actions — стек, который сразу готов к деплою и масштабированию.',
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
    <section id="advantages-section" className="advantages-section">
      <div className="container">
        <h2 className="section-title">Преимущества моего подхода</h2>
        <p className="section-subtitle">
          Почему этот стек — не мода, а решение для реальных задач.
        </p>
        <div className="advantages-grid">
          {advantages.map((adv, idx) => (
            <div key={idx} className="advantage-card">
              <div className="advantage-icon-wrapper">
                {adv.icon}
              </div>
              <h3 className="advantage-title">{adv.title}</h3>
              <p className="advantage-description">{adv.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
