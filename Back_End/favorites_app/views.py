from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Favorites, Favorites_result
from rest_framework.views import APIView
from result_app.models import Result
from .serializers import FavoritesSerializer, FavoritesResultSerializer

class FavoritesView(APIView):
  permission_classes = [IsAuthenticated]

  def get(self, request):
    favorites = Favorites.objects.filter(user=request.user)
    serializer = FavoritesSerializer(favorites, many=True)
    return Response({'favorites_result': serializer.data})
        
class AddToFavoritesView(generics.CreateAPIView):
  serializer_class = FavoritesResultSerializer
  permission_classes = [IsAuthenticated]

  def post(self, request, *args, **kwargs):
    try:
      favorites, created = Favorites.objects.get_or_create(user=request.user)
      result = Result.objects.get(id=kwargs['result_id'])
      favorites_result, created = Favorites_result.objects.get_or_create(favorites=favorites, result=result)
      if not created:
        favorites_result.quantity += 1
      else:
          favorites_result.result_name = request.data.get('result_name', result.name)
          favorites_result.result_description = request.data.get('result_description', result.description)
          favorites_result.result_image = request.data.get('result_image', result.image)
          favorites_result.save()
          print(f"Saved favorite: {favorites_result}")
          return Response(FavoritesResultSerializer(favorites_result).data, status=status.HTTP_201_CREATED)
    except Exception as e:
          print(f"Error: {e}")
          return Response({"detail": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DeleteFavoritesView(generics.DestroyAPIView):
  serializer_class = FavoritesResultSerializer
  permission_classes = [IsAuthenticated]

  def delete(self, request, *args, **kwargs):
    favorites_result = Favorites_result.objects.get(id=kwargs['id'])
    favorites_result.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)