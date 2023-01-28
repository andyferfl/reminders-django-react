from rest_framework import serializers
from .models import Reminder, Category, Media, Photo

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id','category')

class ReminderSerializer(serializers.ModelSerializer):
    category = CategoriesSerializer(many=True)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = Reminder
        #category = serializers.SlugRelatedField(required=True, slug_field='category', queryset=Category.objects.all())
        fields = ('id','title','body','date','date','time','importance','category','user')

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ('id', 'photo', 'title', 'description')

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ('id', 'photo', 'user')


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token