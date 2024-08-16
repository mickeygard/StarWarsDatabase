from django.contrib.auth import authenticate
from rest_framework.status import (
    HTTP_404_NOT_FOUND, 
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED )
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class Sign_up(APIView):
    # queryset = User.objects.all()

    def post(self, request):
        user_data = {
            'username': request.data.get('username'),
            'password': request.data.get('password'),
            'email': request.data.get('email'),
            'alignment': request.data.get('alignment'),
            'bio': request.data.get('bio'),
        }
        new_user = User.objects.create_user(**request.data)
        token = Token.objects.create(user=new_user)
        return Response(
            {"username": new_user.username, "token": token.key}, status=HTTP_201_CREATED
        )

class Master_Sign_Up(APIView):

        def post(self, request):
            master_user = User.objects.create_user(**request.data)
            master_user.is_staff = True
            master_user.is_superuser = True
            master_user.save()
            token = Token.objects.create(user=master_user)
            return Response({"master_user": master_user.email, "token": token.key}, 
                status=HTTP_201_CREATED)

class Log_in(APIView):
    def post(self, request):
        password = request.data.get('password')
        username = request.data.get('username')
        user = authenticate(username=username, password=password)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user': user.email})
        else:
            return Response(
                 "I'm an authenticator droid, Jedi mind tricks don't work on me, only credentials!",
                   status=HTTP_404_NOT_FOUND)

class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"email": request.user.email})
    
class Log_out(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)