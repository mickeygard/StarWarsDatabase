from django.urls import path
from .views import ProfileView, AddFavoritesView, DeleteFavoritesView, ProfileDetailView

urlpatterns = [
    path('profiles/', ProfileView.as_view(), name='profiles'),
    path('<int:pk>/', ProfileDetailView.as_view(), name='profile-detail'),
    path('favorites/add/<int:result_id>/', AddFavoritesView.as_view(), name='add_to_favorites'),
    path('favorites/<int:id>/', DeleteFavoritesView.as_view(), name='delete_favorites'),
]