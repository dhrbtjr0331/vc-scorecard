# Generated by Django 5.1.4 on 2025-01-16 00:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Scorecard",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("date", models.DateField()),
                ("company_name", models.CharField(max_length=255)),
                ("sector", models.CharField(max_length=255)),
                ("investment_stage", models.CharField(max_length=255)),
                ("alignment", models.IntegerField()),
                ("team", models.IntegerField()),
                ("market", models.IntegerField()),
                ("product", models.IntegerField()),
                ("potential_return", models.IntegerField()),
                ("bold_excitement", models.IntegerField()),
            ],
        ),
    ]
