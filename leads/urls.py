from django.urls import path
from .views import LeadCreateView, LLMGenerateView

urlpatterns = [
    path('leads/', LeadCreateView.as_view(), name='lead-create'),
    path('llm/generate/', LLMGenerateView.as_view(), name='llm-generate'),
]