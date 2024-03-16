from django.contrib import admin

# Register your models here.

from .models import RelayRoom,Topic,Message


admin.site.register(RelayRoom)
admin.site.register(Topic)
admin.site.register(Message)
