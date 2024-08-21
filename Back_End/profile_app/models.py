from django.db import models
from user_app.models import User

class Profile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  alignment = models.CharField(max_length=255)
  bio = models.CharField(blank=True, max_length=255)

  def __str__(self):
    return self.user.username

class Favorites(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
  result_id = models.CharField(max_length=255, default="")
  result_name = models.CharField(max_length=255, default="")
  result_description = models.TextField(default="")
  result_image = models.URLField(max_length=255, default="")

  def __str__(self):
    return f"{self.user.username} - {self.result_name}" 
  #not sure if this line is doing the right thing. Maybe it needs to have more info 