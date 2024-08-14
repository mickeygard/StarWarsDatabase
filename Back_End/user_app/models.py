from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class User(AbstractUser):
    email = models.EmailField(unique=True, blank=False)
    username = models.CharField(unique=True, blank=False, max_length=20)
    alignment = models.CharField(default='Citizen', max_length=20)
    # password = models.CharField(blank=False, max_length=50)

  #   groups = models.ManyToManyField(
  #   Group,
  #   related_name='user_app_user_set',  # Add related_name
  #   blank=True,
  #   help_text='The groups this user belongs to.',
  #   verbose_name='groups',
  # )
  #   user_permissions = models.ManyToManyField(
  #   Permission,
  #   related_name='user_app_user_permissions_set',  # Add related_name
  #   blank=True,
  #   help_text='Specific permissions for this user.',
  #   verbose_name='user permissions',
# )
