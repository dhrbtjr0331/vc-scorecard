from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    isAdmin = models.BooleanField(default=False)

class Scorecard(models.Model):
    date = models.DateField()
    company_name = models.CharField(max_length=255)
    sector = models.CharField(max_length=255)
    investment_stage = models.CharField(max_length=255)
    alignment = models.IntegerField()  # Assuming scores are integers between 1-10
    team = models.IntegerField()
    market = models.IntegerField()
    product = models.IntegerField()
    potential_return = models.IntegerField()
    bold_excitement = models.IntegerField()
    score = models.DecimalField(max_digits=10, decimal_places=2)
    scored_by = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="scorecards",
        null=True,
        blank=True,
    )  # The user who scored the card
