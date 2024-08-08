from rest_framework import generics
from .models import Profile, Favorites
from .serializers import ProfileSerializer, FavoritesSerializer

class ProfileView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class AddFavoritesView(generics.CreateAPIView):
    queryset = Favorites.objects.all()
    serializer_class = FavoritesSerializer

class DeleteFavoritesView(generics.DestroyAPIView):
    queryset = Favorites.objects.all()
    serializer_class = FavoritesSerializer
