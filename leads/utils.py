import requests
from django.conf import settings

def call_ollama_chat(prompt: str) -> str:
    url = f"{settings.OLLAMA_BASE_URL}/api/chat"
    payload = {
        "model": settings.OLLAMA_MODEL,
        "messages": [
    {
        "role": "system",
        "content": (
            "Ты — технический менеджер. Проанализируй запрос клиента и верни ТОЛЬКО валидный JSON. "
            "Никаких слов до и после JSON. Никаких markdown-блоков. "
            "Отвечай строго на русском языке. Не используй иностранные слова и иероглифы. "
            'Формат строго: {"requirements": {"project_type": "...", "main_goal": "...", "tech_stack": "...", "deadline": "..."}, "draft_reply": "текст на русском"}'
        ),
    },
    {"role": "user", "content": prompt},
],

        "stream": False,
    }

    # Увеличили таймаут до 180 сек — этого хватит даже для тяжёлых моделей
    resp = requests.post(url, json=payload, timeout=180)
    resp.raise_for_status()
    data = resp.json()
    return data["message"]["content"].strip()
