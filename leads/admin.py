from django.contrib import admin
from .models import Lead
import json
from django.utils.html import format_html

@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'email',
        'project_type',
        'formatted_requirements_summary',
        'has_llm_result',
        # 'draft_reply_preview',  # раскомментируй, если хочешь превью в таблице
        'created_at',
    )
    list_filter = ('project_type', 'created_at')
    search_fields = ('name', 'email', 'phone', 'message')
    readonly_fields = (
        'created_at',
        'llm_requirements',
        'llm_draft_reply',
        'formatted_requirements_summary_full',
    )

    @admin.display(description='Требования (кратко)')
    def formatted_requirements_summary(self, obj):
        if not obj.llm_requirements:
            return format_html('{}', '-')

        try:
            data = json.loads(obj.llm_requirements)
            reqs = data.get('requirements', {})

            parts = []
            if reqs.get('project_type'):
                parts.append(format_html('🏗 <b>Тип:</b> {}', reqs['project_type']))
            if reqs.get('main_goal'):
                parts.append(format_html('🎯 <b>Цель:</b> {}', reqs['main_goal']))
            if reqs.get('tech_stack'):
                parts.append(format_html('💻 <b>Стек:</b> {}', reqs['tech_stack']))
            if reqs.get('deadline'):
                parts.append(format_html('⏳ <b>Срок:</b> {}', reqs['deadline']))

            if parts:
                return format_html('<br>'.join(parts))
            return format_html('{}', 'Данные есть, но структура нестандартная')
        except (json.JSONDecodeError, TypeError):
            return format_html('{}', '❌ Ошибка парсинга JSON')

    @admin.display(description='LLM обработан?', boolean=True)
    def has_llm_result(self, obj):
        return bool(obj.llm_requirements) or bool(obj.llm_draft_reply)

    @admin.display(description='Черновик ответа (превью)')
    def draft_reply_preview(self, obj):
        if obj.llm_draft_reply:
            preview = obj.llm_draft_reply[:120]
            if len(obj.llm_draft_reply) > 120:
                return format_html('{}...', preview)
            return format_html('{}', preview)
        return format_html('{}', 'Нет ответа от LLM')

    @admin.display(description='Требования (JSON, красиво)')
    def formatted_requirements_summary_full(self, obj):
        if not obj.llm_requirements:
            return format_html('{}', '-')
        try:
            data = json.loads(obj.llm_requirements)
            pretty = json.dumps(data, ensure_ascii=False, indent=2)
            return format_html(
                '<pre style="font-family: monospace; max-height: 300px; overflow-y: auto; background: #f5f5f5; padding: 12px; border-radius: 6px; border: 1px solid #ccc;">{}</pre>',
                pretty
            )
        except Exception:
            value = obj.llm_requirements or '-'
            return format_html('{}', value)
