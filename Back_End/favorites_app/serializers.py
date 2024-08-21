from rest_framework import serializers
from .models import Favorites, Favorites_result
from result_app.serializers import ResultSerializer

class FavoritesResultSerializer(serializers.ModelSerializer):
    result = ResultSerializer()

    class Meta:
        model = Favorites_result
        fields = ['id', 'result']

class FavoritesSerializer(serializers.ModelSerializer):
    result_id = serializers.CharField(source='result.result_id')
    result_name = serializers.CharField(source='result.result_name')
    result_description = serializers.CharField(source='result.result_description')
    result_image = serializers.URLField(source='result.result_image')

    class Meta:
        model = Favorites
        fields = ['result_id', 'result_name', 'result_description', 'result_image']