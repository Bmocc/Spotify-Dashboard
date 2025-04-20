from .models import Artists, RTrackArtist, Tracks, RArtistGenre, RAlbumsArtists, RAlbumsTracks, Albums
from django.db.models import Avg, Count
import pandas as pd

def get_artist_details(artist_id):
    artist = Artists.objects.get(pk=artist_id)

    rtracks = RTrackArtist.objects.filter(artist_id=artist_id)
    total_tracks = rtracks.count()
    track_ids = [rt.track_id for rt in rtracks]

    top_tracks_qs = Tracks.objects.filter(id__in=track_ids).order_by('-popularity')[:10]
    top_tracks = [{"trackName": t.name, "popularity": t.popularity} for t in top_tracks_qs]

    avg_pop_dict = Tracks.objects.filter(id__in=track_ids).aggregate(avg=Avg('popularity'))
    avg_pop = avg_pop_dict.get('avg') or 0

    solo_count = 0
    collab_count = 0
    track_counts = RTrackArtist.objects.filter(track_id__in=track_ids) \
                        .values('track_id') \
                        .annotate(artist_count=Count('artist_id'))
    for tc in track_counts:
        if tc['artist_count'] > 1:
            collab_count += 1
        else:
            solo_count += 1

    genres = list(RArtistGenre.objects.filter(artist_id=artist_id).values_list('genre_id', flat=True))

    album_ids = RAlbumsArtists.objects.filter(artist_id=artist_id).values_list('album_id', flat=True)
    albums_qs = Albums.objects.filter(id__in=album_ids)

    album_list = []
    for a in albums_qs:
        release_date_str = pd.to_datetime(a.release_date, unit='ms', errors='coerce').strftime('%m/%d/%Y') if a.release_date else None


        track_ids_for_album = RAlbumsTracks.objects.filter(album_id=a.id).values_list('track_id', flat=True)
        track_list = [{
            "id": t.id,
            "name": t.name,
            "duration": t.duration,
            "popularity": t.popularity,
            "explicit": t.explicit,
            "trackNumber": t.track_number,
        } for t in Tracks.objects.filter(id__in=track_ids_for_album).order_by('track_number')]

        album_obj = {
            "albumName": a.name,
            "popularity": a.popularity,
            "releaseDate": release_date_str,
            "tracklist": track_list,
        }
        album_list.append(album_obj)

    album_count = albums_qs.count()

    data = {
        "id": artist.id,
        "name": artist.name,
        "genres": genres,
        "popularity": artist.popularity,
        "followers": artist.followers,
        "totalTracks": total_tracks,
        "averageTrackPopularity": avg_pop,
        "collaborationCount": {
            "solo": solo_count,
            "collaboration": collab_count,
        },
        "topTracks": top_tracks,
        "albums": album_list,
        "numAlbums": album_count,
    }

    return data
