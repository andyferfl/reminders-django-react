from django.db import models
from users.models import CustomUser

class Category(models.Model):
    category = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.category

class Reminder(models.Model):

    options = (
        ('low','Low'),
        ('medium','Medium'),
        ('high','High'),
    )

    title = models.CharField(max_length=150)
    body = models.TextField(blank=True)
    date = models.DateField()
    time = models.TimeField()
    importance = models.CharField(max_length=10, choices=options, default='low')
    category = models.ManyToManyField(Category, related_name='reminder_category', blank=True)
    user = models.ForeignKey(CustomUser, verbose_name='User', on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Media(models.Model):
    photo = models.ImageField()
    title = models.CharField(max_length=150, default='unavailable')
    description = models.TextField(null=True, blank=True)


    def __str__(self):
        return self.title

class Photo(models.Model):
    photo = models.ImageField(null=False, blank=False)
    user = models.ForeignKey(CustomUser, verbose_name='User', on_delete=models.CASCADE)

    def __str__(self):
        return self.photo.url
