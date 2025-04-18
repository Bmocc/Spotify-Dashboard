from rest_framework.decorators import api_view
from rest_framework.response import Response
from .recommender import get_recommendations
from .similar_artist import get_similar_artists
from .artist_details import get_artist_details
from .audio_features import get_artist_audio_features, get_genre_audio_features
from .collaboration import get_collaborations
from .serializers import ArtistsSerializer
from .models import *


@api_view(['GET'])
def recommender(request):
    recommendations = get_recommendations(request)
    return Response(recommendations)


@api_view(['GET'])
def search_artist(request):
    query = request.query_params.get('name', None)
    if query:
        artists = Artists.objects.filter(name__icontains=query)
    else:
        artists = Artists.objects.none()
    serializer = ArtistsSerializer(artists, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def artist_detail(request, artist_id):
    if request.method == "GET":
        artist_details = get_artist_details(artist_id)

    return Response(artist_details)


@api_view(['GET'])
def similar_artists(request, artist_id):
    if request.method == "GET":
        similar_artists = get_similar_artists(artist_id)

    return Response(similar_artists)


@api_view(['GET'])
def track_stats(request, artist_id):
    # Example logic: you could query related Tracks and calculate stats
    # For demonstration, we return dummy data.
    stats = {
        "total_tracks": 120,
        "top_tracks": [
            {"name": "No Woman, No Cry", "popularity": 90},
            {"name": "One Love", "popularity": 88},
            {"name": "Redemption Song", "popularity": 87}
        ]
    }
    return Response(stats)

@api_view(['GET'])
def audio_features(request, artist_id):
    if request.method == "GET":
        artist_audio_features = get_artist_audio_features(artist_id)

        avg_audio_features = get_genre_audio_features(artist_id)

    return Response({
        "artistFeatures": artist_audio_features,
        "genreFeatures": avg_audio_features
    })

@api_view(['GET'])
def collaboration(request, artist_id):
    if request.method == "GET":
        collab_data = get_collaborations(artist_id)

    return Response(collab_data)