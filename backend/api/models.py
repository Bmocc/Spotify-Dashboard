from django.db import models


class AudioFeatures(models.Model):
    id = models.CharField(blank=True, null=True)  
    acousticness = models.FloatField(blank=True, null=True)  
    analysis_url = models.URLField(blank=True, null=True)  
    danceability = models.FloatField(blank=True, null=True)  
    duration = models.IntegerField(blank=True, null=True)  
    energy = models.FloatField(blank=True, null=True) 
    instrumentalness = models.FloatField(blank=True, null=True)
    key = models.IntegerField(blank=True, null=True)  
    liveness = models.FloatField(blank=True, null=True) 
    loudness = models.FloatField(blank=True, null=True)  
    mode = models.BooleanField(blank=True, null=True)  
    speechiness = models.FloatField(blank=True, null=True) 
    tempo = models.FloatField(blank=True, null=True)  
    time_signature = models.IntegerField(blank=True, null=True)  
    valence = models.FloatField(blank=True, null=True)  

    class Meta:
        db_table = 'audio_features'
    
class Albums(models.Model):
    id = models.CharField(blank=True, null=True)  
    name = models.CharField(blank=True, null=True)  
    album_group = models.TextField(blank=True, null=True)  # This field type is a guess.
    album_type = models.CharField(blank=True, null=True) 
    release_date = models.IntegerField(blank=True, null=True)  
    popularity = models.IntegerField(blank=True, null=True)  

    class Meta:
        db_table = 'albums'

class Artists(models.Model):
    name = models.CharField(blank=True, null=True)  
    id = models.CharField(blank=True, null=True) 
    popularity = models.IntegerField(blank=True, null=True) 
    followers = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'artists'

class Genres(models.Model):
    id = models.CharField(blank=True, null=True) 

    class Meta:
        db_table = 'genres'

class Tracks(models.Model):
    id = models.CharField(blank=True, null=True)  
    disc_number = models.IntegerField(blank=True, null=True) 
    duration = models.IntegerField(blank=True, null=True)  
    explicit = models.IntegerField(blank=True, null=True)  
    audio_feature_id = models.CharField(blank=True, null=True)  
    name = models.CharField(blank=True, null=True) 
    preview_url = models.URLField(blank=True, null=True) 
    track_number = models.IntegerField(blank=True, null=True) 
    popularity = models.IntegerField(blank=True, null=True) 
    is_playable = models.FloatField(blank=True, null=True)  

    class Meta:
        db_table = 'tracks'

class RTrackArtist(models.Model):
    track_id = models.CharField(blank=True, null=True)  
    artist_id = models.CharField(blank=True, null=True)  

    class Meta:
        db_table = 'r_track_artist'

class RArtistGenre(models.Model):
    genre_id = models.CharField(blank=True, null=True) 
    artist_id = models.CharField(blank=True, null=True)  

    class Meta:
        db_table = 'r_artist_genre'

class RAlbumsTracks(models.Model):
    album_id = models.CharField(blank=True, null=True)  
    track_id = models.CharField(blank=True, null=True)  

    class Meta:
        db_table = 'r_albums_tracks'

class RAlbumsArtists(models.Model):
    album_id = models.CharField(blank=True, null=True)  
    artist_id = models.CharField(blank=True, null=True)  

    class Meta:
        db_table = 'r_albums_artists'
