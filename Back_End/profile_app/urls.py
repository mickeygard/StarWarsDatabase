from django.urls import path
from .views import AddFavoritesView, DeleteFavoritesView, ProfileDetailView, ProfileView
from . import views

urlpatterns = [
    path('create_profile/', views.create_profile, name='create_profile'),
    path('profile/<int:pk>/', ProfileDetailView.as_view(), name='profile_detail'),
    path('favorites/add/<int:result_id>/', AddFavoritesView.as_view(), name='add_to_favorites'),
    path('favorites/<int:id>/', DeleteFavoritesView.as_view(), name='delete_favorites'),
    path('profile/', ProfileView.as_view(), name='profile_view')
]