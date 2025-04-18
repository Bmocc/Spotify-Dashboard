from django.db import models


class AudioFeatures(models.Model):
    id = models.CharField(max_length=50, primary_key=True)  
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
    id = models.CharField(max_length=50, primary_key=True)  
    name =models.CharField(max_length=50)
    album_group = models.TextField(blank=True, null=True)  # This field type is a guess.
    album_type = models.CharField(max_length=50)
    release_date = models.IntegerField(blank=True, null=True)  
    popularity = models.IntegerField(blank=True, null=True)  

    class Meta:
        db_table = 'albums'

class Artists(models.Model):
    name = models.CharField(max_length=50) 
    id = models.CharField(max_length=50, primary_key=True) 
    popularity = models.IntegerField(blank=True, null=True) 
    followers = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'artists'

class Genres(models.Model):
    id = models.CharField(max_length=50, primary_key=True) 

    class Meta:
        db_table = 'genres'

class Tracks(models.Model):
    id = models.CharField(max_length=50, primary_key=True)  
    disc_number = models.IntegerField(blank=True, null=True) 
    duration = models.IntegerField(blank=True, null=True)  
    explicit = models.IntegerField(blank=True, null=True)  
    audio_feature_id = models.CharField(max_length=50) 
    name = models.CharField(max_length=50)
    preview_url = models.URLField(blank=True, null=True) 
    track_number = models.IntegerField(blank=True, null=True) 
    popularity = models.IntegerField(blank=True, null=True) 
    is_playable = models.FloatField(blank=True, null=True)  

    class Meta:
        db_table = 'tracks'

class RTrackArtist(models.Model):
    id = models.AutoField(primary_key=True)
    track_id = models.CharField(max_length=50)
    artist_id = models.CharField(max_length=50)

    class Meta:
        db_table = 'r_track_artist'

class RArtistGenre(models.Model):
    id = models.AutoField(primary_key=True)
    genre_id = models.CharField(max_length=50)
    artist_id = models.CharField(max_length=50)

    class Meta:
        db_table = 'r_artist_genre'

class RAlbumsTracks(models.Model):
    id = models.AutoField(primary_key=True)
    album_id = models.CharField(max_length=50)
    track_id = models.CharField(max_length=50)

    class Meta:
        db_table = 'r_albums_tracks'

class RAlbumsArtists(models.Model):
    id = models.AutoField(primary_key=True)
    album_id = models.CharField(max_length=50)
    artist_id = models.CharField(max_length=50)

    class Meta:
        db_table = 'r_albums_artists'

class ArtistVector(models.Model):
    artist = models.OneToOneField('Artists', on_delete=models.CASCADE, primary_key=True)
    vector = models.JSONField()  
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'artist_vector'


class PrecomputedTrack(models.Model):
    id = models.AutoField(primary_key=True)
    track_id = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=255)
    popularity = models.IntegerField()
    
    danceability = models.FloatField()
    energy = models.FloatField()
    tempo = models.FloatField()
    valence = models.FloatField()
    
    artist = models.CharField(max_length=255)

    class Meta:
        db_table = 'precomputed_track'
    
    def __str__(self):
        return f"{self.name} ({self.track_id})"
    

class PrecomputedArtist(models.Model):
    id = models.AutoField(primary_key=True)
    artist_id = models.CharField(max_length=50)
    name = models.CharField(max_length=255)
    popularity = models.IntegerField()
    danceability = models.FloatField()
    energy = models.FloatField()
    loudness = models.FloatField()
    speechiness = models.FloatField()
    valence = models.FloatField()
    tempo = models.FloatField()

    class Meta:
        db_table = 'precomputed_artist'

    def __str__(self):
        return f"{self.name} ({self.artist_id})"

