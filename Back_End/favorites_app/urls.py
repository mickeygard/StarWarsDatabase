from django.urls import path
from views import FavoritesView, AddToFavoritesView, DeleteFavoritesView


urlpatterns = [
    path('', FavoritesView.as_view(), name='favorites'),
    path('add/<int:result_id>/', AddToFavoritesView.as_view(), name='add_to_favoites'),
    path('<int:id>/', DeleteFavoritesView.as_view(), name='delete_result'),
]