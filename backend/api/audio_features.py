from django.db.models import Avg
from .models import AudioFeatures, Tracks, RTrackArtist, Artists, RArtistGenre

def get_artist_audio_features(artist_id):
    track_ids = RTrackArtist.objects.filter(artist_id=artist_id).values_list('track_id', flat=True)
    audio_feature_ids = Tracks.objects.filter(id__in=track_ids).values_list('audio_feature_id', flat=True)
    features = AudioFeatures.objects.filter(id__in=audio_feature_ids)
    artist_avg_features = features.aggregate(
        acousticness=Avg('acousticness'),
        danceability=Avg('danceability'),
        energy=Avg('energy'),
        instrumentalness=Avg('instrumentalness'),
        liveness=Avg('liveness'),
        speechiness=Avg('speechiness'),
        valence=Avg('valence'),
    )
    return artist_avg_features


def get_artist_genres(artist_id):
    genre_ids = RArtistGenre.objects.filter(artist_id=artist_id).values_list('genre_id', flat=True)
    # If you need additional details from the Genres model, you could do:
    # genres = Genres.objects.filter(id__in=genre_ids).values_list('id', flat=True)
    return list(genre_ids)

def get_genre_audio_features(artist_id):
    genres = get_artist_genres(artist_id)
    
    artist_ids = RArtistGenre.objects.filter(genre_id__in=genres)\
                                      .values_list('artist_id', flat=True).distinct()
    
    track_ids = RTrackArtist.objects.filter(artist_id__in=artist_ids)\
                                    .values_list('track_id', flat=True)
    
    audio_feature_ids = Tracks.objects.filter(id__in=track_ids)\
                                      .values_list('audio_feature_id', flat=True)
    
    features = AudioFeatures.objects.filter(id__in=audio_feature_ids)
    avg_features = features.aggregate(
        acousticness=Avg('acousticness'),
        danceability=Avg('danceability'),
        energy=Avg('energy'),
        instrumentalness=Avg('instrumentalness'),
        liveness=Avg('liveness'),
        speechiness=Avg('speechiness'),
        valence=Avg('valence'),
    )
    return avg_features