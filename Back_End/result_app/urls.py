from django.urls import path
from .views import AllResultView, ResultByCategoryView, SingleResultView

urlpatterns = [
    path('', AllItemsView.as_view(), name='all_items'),
    path('category/<str:category>/', ItemsByCategoryView.as_view(), name='items_by_category'),
    path('<int:pk>/', SingleItemView.as_view(), name='an_item'),
]