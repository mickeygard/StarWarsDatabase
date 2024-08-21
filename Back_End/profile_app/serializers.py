from rest_framework import serializers
from .models import Profile, Favorites

class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
      model = Profile
      fields = ['user', 'alignment', 'bio']

class FavoritesSerializer(serializers.ModelSerializer):
  class Meta:
      model = Favorites
      fields = ['result_id', 'result_name', 'result_description', 'result_image'] 
      #added these in since yesterday so that the favorites call would actually have more info that just the id. 