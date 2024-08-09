from rest_framework import generics, status
from rest_framework.response import Response
from .models import Result
from .serializers import ResultSerializer
from favorites_app.models import Favorites, Favorites_result

    
class ResultByCategoryView(generics.ListAPIView):
    serializer_class = ResultSerializer

    def get_queryset(self):
        category_name = self.kwargs['category']
        return Result.objects.filter(category__iexact=category_name)

class SingleResultView(generics.RetrieveAPIView):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer

    def post(self, request, *args, **kwargs):
        result = self.get_object()
        favorites, created = Favorites.objects.get_or_create(user=request.user)
        favorites_result, created = Favorites_result.objects.get_or_create(favorites=favorites, result=result)
        if not created:
            favorites_result.quantity += 1
            favorites_result.save()
        return Response(f"{result.name} has been added to your personal collection.", status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        result = self.get_object()
        favorites = Favorites.objects.get(user=request.user)
        favorites_result = Favorites_result.objects.filter(favorites=favorites, result=result)
        favorites_result.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)