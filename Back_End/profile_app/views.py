from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Profile, Favorites
from .serializers import ProfileSerializer, FavoritesSerializer
import logging

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

#the entirety of favoritesview did not exist 8/20 when favorites would not render more than the remove button
class FavoritesView(APIView):
  permission_classes = [IsAuthenticated]

  def get(self, request):
    favorites = Favorites.objects.filter(user=request.user)
    serializer = FavoritesSerializer(favorites, many=True)
    return Response(serializer.data)
    
logger = logging.getLogger(__name__)


class AddFavoritesView(generics.CreateAPIView):
  serializer_class = FavoritesSerializer
  permission_classes = [IsAuthenticated]

  def post(self, request):
    favorites, created = Favorites.objects.get_or_create(user=request.user, 
      result_id=request.data['result_id'])
    if not created:
      return Response({"detail": "Already in favorites"},  
        status=status.HTTP_400_BAD_REQUEST)
    favorites.result_name = request.data['result_name']
    favorites.result_description = request.data['result_description']
    favorites.result_image = request.data['result_image']
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










      # 8/20 code - favorites won't save, bio and alignment won't edit, can't create new profiles, etc.
  # def post(self, request, *args, **kwargs):
  #   try:
  #     result_id = request.data.get('result_id')  # Retrieve result_id from request data
  #     if not result_id:
  #       return Response({"detail": "result_id is required"}, status=status.HTTP_400_BAD_REQUEST)
            
  #       # Ensure result_id is treated as a string
  #     result_id = str(result_id)
            
  #     favorites, created = Favorites.objects.get_or_create(user=request.user)
  #     result = Result.objects.get(_id=result_id)
  #     favorites_result, created = Favorites_result.objects.get_or_create(favorites=favorites, result=result)
  #     if not created:
  #       favorites_result.quantity += 1
  #     else:
  #       favorites_result.result_name = request.data.get('result_name', result.name)
  #       favorites_result.result_description = request.data.get('result_description', result.description)
  #       favorites_result.result_image = request.data.get('result_image', result.image)
  #       favorites_result.save()
  #       return Response(FavoritesSerializer(favorites_result).data, status=status.HTTP_201_CREATED)
  #   except Exception as e:
  #     return Response({"detail": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)