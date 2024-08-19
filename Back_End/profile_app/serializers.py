from rest_framework import serializers
from .models import Profile, Favorites

class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
      model = Profile
      fields = ['user', 'alignment', 'bio']

class FavoritesSerializer(serializers.ModelSerializer):
  class Meta:
      model = Favorites
      fields = ["result_id"]