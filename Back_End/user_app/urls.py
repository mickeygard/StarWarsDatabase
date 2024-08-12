from django.urls import path
from .views import CreateAccountView, LoginView, LogoutView, UserInfoView, check_username
from . import views

urlpatterns = [
    path('createaccount/', CreateAccountView.as_view(), name='createaccount'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('info/', UserInfoView.as_view(), name='info'),
    path('check-username/<str:username>/', check_username, name='check-username')
]