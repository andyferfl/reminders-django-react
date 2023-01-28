from django.contrib import admin
from .models import Reminder, Category, Media, Photo


class ReminderAdmin(admin.ModelAdmin):
    search_fields = ('title', 'body',)
    
    list_filter = ('title', 'body', 'date', 'time', 'importance', 'category', 'user',)
    
    ordering = ('-date',)
    list_display = ('title', 'body', 'date', 'time', 'importance', 'user',)
    
    fieldsets = (
        (None, {'fields': ('title', 'user', 'body', 'date', 'time', )}),
        ('Tags', {'fields': ('importance', 'category',)}),
    )

    filter_horizontal = ('category',)

admin.site.register(Reminder, ReminderAdmin)
admin.site.register(Category)
admin.site.register(Media)
admin.site.register(Photo)
