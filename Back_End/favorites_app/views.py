from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Favorites, Favorites_result
from result_app.models import Result
from .serializers import FavoritesSerializer, FavoritesResultSerializer

class FavoritesView(generics.RetrieveAPIView):
    serializer_class = FavoritesSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        favorites, created = Favorites.objects.get_or_create(user=self.request.user)
        return favorites

class AddToFavoritesView(generics.CreateAPIView):
    serializer_class = FavoritesResultSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        favorites, created = Favorites.objects.get_or_create(user=request.user)
        result = Result.objects.get(id=kwargs['result_id'])
        favorites_result, created = Favorites_result.objects.get_or_create(favorites=favorites, result=result)
        if not created:
            favorites_result.quantity += 1
            favorites_result.save()
        return Response(FavoritesResultSerializer(favorites_result).data, status=status.HTTP_201_CREATED)
    
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

class DeleteFavoritesView(generics.DestroyAPIView):
    serializer_class = FavoritesResultSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        favorites_result = Favorites_result.objects.get(id=kwargs['id'])
        favorites_result.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)