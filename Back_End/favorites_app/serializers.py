from rest_framework import serializers
from .models import Favorites, Favorites_result
from result_app.serializers import ResultSerializer

class FavoritesResultSerializer(serializers.ModelSerializer):
    result = ResultSerializer()

    class Meta:
        model = Favorites_result
        fields = ['id', 'result']

class FavoritesSerializer(serializers.ModelSerializer):
    favorites_result = FavoritesResultSerializer(source='favorites_result_set',many=True)

    class Meta:
        model = Favorites
        fields = ['favorites_result']