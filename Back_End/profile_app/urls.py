from django.urls import path
from .views import AddFavoritesView, DeleteFavoritesView, ListFavoritesView, ProfileDetailView, ProfileView
from . import views

urlpatterns = [
    path('create_profile/', views.create_profile, name='create_profile'),
    path('profile/<int:pk>/', ProfileDetailView.as_view(), name='profile_detail'),
    path('favorites/add/', AddFavoritesView.as_view(), name='add_to_favorites'),
    path('favorites/delete/<str:result_id>/', DeleteFavoritesView.as_view(), name='delete_favorites'),
    path('profile/', ProfileView.as_view(), name='profile_view'),
    path('favorites/', ListFavoritesView.as_view(), name='list_favorites'),
]