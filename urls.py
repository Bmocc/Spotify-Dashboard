from django.contrib import admin
from django.urls import path
from .views import recommend_tracks

urlpatterns = [
    path('admin/', admin.site.urls),
    path('recommend_tracks/', recommend_tracks)
]
