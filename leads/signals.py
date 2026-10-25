from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Lead
from .tasks import analyze_lead_with_llm

@receiver(post_save, sender=Lead)
def lead_post_save(sender, instance, created, **kwargs):
    if created:
        analyze_lead_with_llm.delay(instance.id)
