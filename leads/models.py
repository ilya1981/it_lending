from django.db import models
from django.apps import apps

class Lead(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    project_type = models.CharField(max_length=100, blank=True, null=True)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    # Поля для LLM-агента
    llm_requirements = models.TextField(blank=True, null=True, help_text="Выделенные требования от LLM")
    llm_draft_reply = models.TextField(blank=True, null=True, help_text="Черновик ответа от LLM")

    def __str__(self):
        return f"{self.name} — {self.project_type}"

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        super().save(*args, **kwargs)  # сначала сохраняем, чтобы появился pk

        if is_new:
            # Локальный импорт, чтобы избежать циклического импорта models <-> tasks
            from .tasks import analyze_lead_with_llm
            analyze_lead_with_llm.delay(self.pk)
