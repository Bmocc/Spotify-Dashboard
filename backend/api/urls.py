from django.urls import path
from .views import artist_detail, search_artist, track_stats, audio_features, collaboration, recommender, similar_artists

urlpatterns = [
    path('artist/<str:artist_id>/', artist_detail, name='artist_detail'),
    path('search_artist/', search_artist, name='search_artist'),
    path('track_stats/<str:artist_id>/', track_stats, name='track_stats'),
    path('audio_features/<str:artist_id>/', audio_features, name='audio_features'),
    path('collaboration/<str:artist_id>/', collaboration, name='collaboration'),
    path('recommender/', recommender, name='recommender'),
    path('similar_artists/<str:artist_id>/', similar_artists, name='similar_artists'),
]
