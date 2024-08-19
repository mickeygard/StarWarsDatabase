from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Profile, Favorites
from .serializers import ProfileSerializer, FavoritesSerializer

@api_view(['POST'])
def create_profile(request):
  serializer = ProfileSerializer(data=request.data)
  if serializer.is_valid():
    profile = serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileView(APIView):
  permission_classes = [IsAuthenticated]

  def get(self, request):
    try:
      profile = Profile.objects.get(user=request.user)
    except Profile.DoesNotExist:
      profile = Profile.objects.create(user=request.user)
    serializer = ProfileSerializer(profile)
    return Response(serializer.data)

class ProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
  queryset = Profile.objects.all()
  serializer_class = ProfileSerializer

class AddFavoritesView(generics.CreateAPIView):
  serializer_class = FavoritesSerializer
  permission_classes = [IsAuthenticated]

  def post(self, request, *args, **kwargs):
    favorites, created = Favorites.objects.get_or_create(user=request.user, 
      result_id=request.data['result_id'])
    if not created:
      return Response({"detail": "Already in favorites"},  
        status=status.HTTP_400_BAD_REQUEST)
    favorites.result_name = request.data['result_name']
    favorites.save()
    return Response(FavoritesSerializer(favorites).data, status=status.HTTP_201_CREATED)

class DeleteFavoritesView(generics.DestroyAPIView):
  serializer_class = FavoritesSerializer
  permission_classes = [IsAuthenticated]

  def delete(self, request, *args, **kwargs):
      favorites = Favorites.objects.get(user=request.user, result_id=kwargs['result_id'])
      favorites.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)

class ListFavoritesView(generics.ListAPIView):
  serializer_class = FavoritesSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    return Favorites.objects.filter(user=self.request.user)