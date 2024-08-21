from django.urls import path
from .views import FavoritesView, AddToFavoritesView, DeleteFavoritesView


urlpatterns = [
    path('favorites/', FavoritesView.as_view(), name='favorites_view'),
    path('add/<int:result_id>/', AddToFavoritesView.as_view(), name='add_to_favorites'),
    path('delete/<int:_id>/', DeleteFavoritesView.as_view(), name='delete_favorite'), #removed result from 'int:result_id' that may be the wrong move, also this could be where the issue of the id expecting an integer comes from.
]