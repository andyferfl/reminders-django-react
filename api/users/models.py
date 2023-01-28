from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self, username, full_name, password, **other_fields):
        
        if not password:
            raise ValueError('Password must be provided')

        user = self.model(username=username, full_name=full_name, **other_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, full_name, password, **other_fields):
        other_fields.setdefault('is_superuser', True)

        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must be assigned to is_superuser=True')

        return self.create_user(username, full_name, password, **other_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):

    username = models.CharField(max_length=150, unique=True)
    full_name = models.CharField(max_length=150, blank=False)
    datetime = models.DateTimeField(default=timezone.now)
    about = models.TextField(max_length=500,blank=True)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['full_name']

    def __str__(self):
        return self.username