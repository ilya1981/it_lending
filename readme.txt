Как запустить и проверить llm
Подними Redis (если нет): docker run -d -p 6379:6379 redis.
Запусти Django: python manage.py runserver.
Запусти воркер Celery: celery -A backend worker --loglevel=info.
Отправь тестовый лид через форму.
Проверь админку: через 5–15 секунд появится llm_requirements.