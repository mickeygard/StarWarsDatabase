from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(default='Padawan', max_length=25)
    affiliation = models.CharField(default='Citizen', max_length=25)

    groups = models.ManyToManyField(
    Group,
    related_name='user_app_user_set',  # Add related_name
    blank=True,
    help_text='The groups this user belongs to.',
    verbose_name='groups',
  )
    user_permissions = models.ManyToManyField(
    Permission,
    related_name='user_app_user_permissions_set',  # Add related_name
    blank=True,
    help_text='Specific permissions for this user.',
    verbose_name='user permissions',
)
