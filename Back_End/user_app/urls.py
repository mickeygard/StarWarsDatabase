from django.urls import path
from .views import Sign_up, Log_in, Log_out, Info, Master_Sign_Up


urlpatterns = [
    path('sign_up/', Sign_up.as_view(), name='sign_up'),
    path('login/', Log_in.as_view(), name='log_in'),
    path('logout/', Log_out.as_view(), name='log_out'),
    path('info/', Info.as_view(), name='info'),
    path('master/', Master_Sign_Up.as_view(), name='master_sign_up')

]