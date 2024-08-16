from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.EmailField(unique=True, blank=False)
    username = models.CharField(unique=True, max_length=20)
    alignment = models.CharField(default="Loth Cat")
    bio = models.TextField(blank=True, null=True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []