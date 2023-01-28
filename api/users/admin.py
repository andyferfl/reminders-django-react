from django.contrib import admin
from .models import CustomUser
from django.contrib.auth.admin import UserAdmin
from django.forms import Textarea, TextInput

class UserAdminConfig(UserAdmin):
    search_fields = ('username', 'full_name',)
    
    list_filter = ('username', 'full_name', 'is_active', 'is_superuser', 'is_staff',)
    
    ordering = ('-datetime',)
    list_display = ('username', 'full_name', 'is_active', 'is_staff', 'is_superuser', 'datetime')
    
    fieldsets = (
        (None, {'fields': ('username','full_name',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser')}),
        ('Personal', {'fields': ('about',)}),
    )







admin.site.register(CustomUser, UserAdminConfig)