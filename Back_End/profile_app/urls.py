from django.urls import path
from .views import ProfileView, AddFavoritesView, DeleteFavoritesView, ProfileDetailView
from . import views

urlpatterns = [
    path('profiles/', views.create_profile, name='create-profile'),
    path('profiles/<int:pk>/', ProfileDetailView.as_view(), name='profile-detail'),
    path('favorites/add/<int:result_id>/', AddFavoritesView.as_view(), name='add_to_favorites'),
    path('favorites/<int:id>/', DeleteFavoritesView.as_view(), name='delete_favorites'),
]