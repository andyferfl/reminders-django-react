from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination
from .models import Reminder, Category, Media, Photo
from .serializers import ReminderSerializer, CategoriesSerializer, MediaSerializer, MyTokenObtainPairSerializer, PhotoSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import filters

class ReminderPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 10000

class PhotoPagination(LimitOffsetPagination):
    default_limit = 2
    offset_query_param = 'offset'
    max_limit = 10000

class ReminderList(generics.ListCreateAPIView):
    def get_queryset(self):
        return Reminder.objects.filter(user=self.request.user)

    queryset = get_queryset
    serializer_class = ReminderSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = ReminderPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, ]
    filterset_fields = ['importance', 'category', 'date']
    search_fields = ['title', 'body']

    def create(self, request, *args, **kwargs):
        data = request.data
        user=self.request.user
        newReminder = Reminder.objects.create(title=data["title"],body=data["body"],date=data["date"],time=data["time"],importance=data["importance"],user=user)
        newReminder.save()

        for cat in data["category"]:
            catObj = Category.objects.get(category=cat["category"])
            newReminder.category.add(catObj)

        serializer = ReminderSerializer(newReminder)

        return Response(serializer.data)

class ReminderDetail(generics.RetrieveUpdateDestroyAPIView):
    def get_queryset(self):
        return Reminder.objects.filter(user=self.request.user)

    queryset = get_queryset
    serializer_class = ReminderSerializer
    permission_classes = (IsAuthenticated,)

class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoriesSerializer

class MediaList(generics.ListCreateAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer

class PhotoList(generics.ListCreateAPIView):
    def get_queryset(self):
        return Photo.objects.filter(user=self.request.user)

    queryset = get_queryset
    serializer_class = PhotoSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = PhotoPagination

    def create(self, request, *args, **kwargs):
        data = request.data
        user=self.request.user
        newPhoto = Photo.objects.create(photo=data["photo"],user=user)
        newPhoto.save()

        serializer = PhotoSerializer(newPhoto)

        return Response(serializer.data)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
