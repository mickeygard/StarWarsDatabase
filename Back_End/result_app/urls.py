from django.urls import path
from .views import ResultByCategoryView, SingleResultView

urlpatterns = [
    path('category/<str:category>/', ResultByCategoryView.as_view(), name='result_by_category'),
    path('<int:pk>/', SingleResultView.as_view(), name='a_result'),
]