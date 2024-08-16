from django.urls import path
from .views import FavoritesView, AddToFavoritesView, DeleteFavoritesView


urlpatterns = [
    path('favorites/', FavoritesView.as_view(), name='favorites_view'),
    path('add/<int:result_id>/', AddToFavoritesView.as_view(), name='add_to_favorites'),
    path('<int:_id>/', DeleteFavoritesView.as_view(), name='delete_result'),
]