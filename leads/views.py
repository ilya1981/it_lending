from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import call_ollama_chat
from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from .models import Lead
from .serializers import LeadSerializer

class LeadCreateView(CreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer


class LLMGenerateView(APIView):
    def post(self, request):
        prompt = request.data.get("prompt", "")
        if not prompt:
            return Response({"error": "Поле prompt обязательно"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            response_text = call_ollama_chat(prompt)
            return Response({"response": response_text})
        except Exception as e:
            # Важно: не прокидывай детали ошибки наружу, чтобы не светить стек
            return Response({"error": "Не удалось получить ответ от LLM"}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
