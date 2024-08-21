# favorites_app/models.py
from django.db import models
from user_app.models import User
from result_app.models import Result

class Favorites(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='favorites_favorites')

class Favorites_result(models.Model):
    favorites = models.ForeignKey(Favorites, related_name='favorite_result_set', on_delete=models.CASCADE),
    result = models.ForeignKey(Result, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.result.name}'