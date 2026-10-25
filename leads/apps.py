from django.apps import AppConfig

class LeadsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'leads'

    def ready(self):
        # Это заставит Django загрузить signals.py при старте
        import leads.signals  # noqa: F401
