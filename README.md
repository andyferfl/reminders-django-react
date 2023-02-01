# reminders-django-react

A simple reminder web app

To run use the command

>docker-compose up

then enter to the django container and apply migrations for users and reminders, 
the api will be on port 8000 and the web app on port 3000 as usual

Only the superuser can add users so don't forget to create it

>python manage.py createsuperuser
