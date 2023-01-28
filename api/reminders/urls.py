from django.urls import path
from .views import ReminderList, ReminderDetail, MediaList, CategoryList, MyTokenObtainPairView, PhotoList

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

app_name = 'reminder'

urlpatterns = [
    path('<int:pk>/', ReminderDetail.as_view(), name='detailcreate'),
    path('', ReminderList.as_view(), name='listcreate'),
    path('categories/', CategoryList.as_view(), name='listcreate'),
    path('media/', MediaList.as_view(), name='listcreate'),
    path('photos/', PhotoList.as_view(), name='listcreate'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]


