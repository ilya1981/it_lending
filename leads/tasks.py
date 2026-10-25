import json
from celery import shared_task
from django.db import transaction
from .models import Lead
from .utils import call_ollama_chat

@shared_task(bind=True, max_retries=3, default_retry_delay=15)
def analyze_lead_with_llm(self, lead_id: int):
    # Используем транзакцию, чтобы запись в БД была атомарной
    with transaction.atomic():
        try:
            # select_for_update блокирует строку, чтобы не было гонок, если задача придёт дважды
            lead = Lead.objects.select_for_update().get(pk=lead_id)
        except Lead.DoesNotExist:
            # Лид удалили до обработки — это нормально, задачу можно просто закрыть
            return

        if not lead.message:
            return

        # Если поля уже заполнены (например, задача запустилась повторно), не делаем запрос к LLM
        if lead.llm_requirements and lead.llm_draft_reply:
            return

        prompt = (
            f"Клиент: {lead.name or 'не указано'} ({lead.email or 'нет email'}). "
            f"Телефон: {lead.phone or 'нет телефона'}. "
            f"Тип проекта: {lead.project_type or 'не указан'}. "
            f"Сообщение: {lead.message}. "
            "Проанализируй и верни ТОЛЬКО валидный JSON. Никаких слов до и после JSON. "
            'Формат строго: {"requirements": {"project_type": "...", "main_goal": "...", "tech_stack": "...", "deadline": "..."}, "draft_reply": "текст"}'
        )

        try:
            response_text = call_ollama_chat(prompt)
        except Exception as e:
            # Если упал сетевой запрос к Ollama — Celery сам сделает retry
            raise self.retry(exc=e, countdown=15)

        start = response_text.find("{")
        end = response_text.rfind("}") + 1

        if start == -1 or end <= start:
            lead.llm_draft_reply = response_text
            lead.save(update_fields=["llm_draft_reply"])
            return

        json_part = response_text[start:end]
        try:
            parsed = json.loads(json_part)
            requirements = parsed.get("requirements", {})
            draft_reply = parsed.get("draft_reply", "")

            lead.llm_requirements = json.dumps(requirements)
            lead.llm_draft_reply = draft_reply
            lead.save(update_fields=["llm_requirements", "llm_draft_reply"])
        except json.JSONDecodeError:
            lead.llm_draft_reply = json_part
            lead.save(update_fields=["llm_draft_reply"])

        except Exception as exc:
        # Любая другая ошибка — тоже retry
            raise self.retry(exc=exc, countdown=15)
