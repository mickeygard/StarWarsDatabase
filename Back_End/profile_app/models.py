from django.db import models
from user_app.models import User

class Profile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  alignment = models.CharField(max_length=255)
  bio = models.CharField(blank=True)

  def __str__(self):
    return self.user.username

class Favorites(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
  category = models.CharField(max_length=255)
  result_id = models.CharField(max_length=255)
  result_name = models.CharField(max_length=255)

  def __str__(self):
    return f"{self.user.username} - {self.result_name}"