from django.contrib.auth import login, logout, authenticate
from rest_framework.status import (
    HTTP_200_OK, 
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED )
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from .models import User
from .serializers import UserSerializer
from profile_app.models import Profile
from profile_app.serializers import ProfileSerializer


@api_view(['GET'])
def check_username(request, username):
    is_taken = User.objects.filter(username=username).exists()
    return Response({'taken': is_taken})

class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        profile_data = {
            'user': user.id,
            'organization_alignment': request.data.get('organization_alignment', ''),
            'bio': request.data.get('bio', '')
        }
        profile_serializer = ProfileSerializer(data=profile_data)
        if profile_serializer.is_valid():
            profile_serializer.save()
        else:
            user.delete()  # Undo user creation if profile creation fails
            return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        headers = self.get_success_headers(serializer.data)
        return Response({"user": user.username, "token": token.key}, 
            status=status.HTTP_201_CREATED, headers=headers)
        

class LoginView(APIView):
    def post(self, request):
        password = request.data.get('password')
        username = request.data.get('username')
        user = authenticate(username=username, password=password)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'email': user.email}, status=status.HTTP_200_OK)
        else:
            return Response({'error':
                 "I'm an authenticator droid, Jedi mind tricks don't work on me, only credentials!"},
                   status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserInfoView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user