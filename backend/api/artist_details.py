from .models import Artists, RTrackArtist, Tracks, RArtistGenre, RAlbumsArtists, Albums
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


    genres = RArtistGenre.objects.filter(artist_id=artist_id).values_list('genre_id', flat=True)

    album_ids = RAlbumsArtists.objects.filter(artist_id=artist_id).values_list('album_id', flat=True)

    albums_qs = Albums.objects.filter(id__in=album_ids)

    album_list = [{
        "albumName": a.name,
        "popularity": a.popularity,
        "releaseDate": pd.to_datetime(a.release_date, unit='ms', errors='coerce').strftime('%Y-%m-%d') if a.release_date else None
    } for a in albums_qs]

    album_count = albums_qs.count()

    albums_df = pd.DataFrame.from_records(
    albums_qs.values('name', 'popularity', 'release_date')
)

    if not albums_df.empty:
        albums_df['release_date'] = pd.to_datetime(albums_df['release_date'], unit='ms', errors='coerce')
        albums_df = albums_df.dropna(subset=['release_date'])

        albums_df['month'] = albums_df['release_date'].dt.to_period('M').astype(str)

        trend_df = albums_df.groupby('month').agg({'popularity': 'mean'}).reset_index()
        trend_data = trend_df.to_dict(orient='records')
    else:
        trend_data = []

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
        "trendData": trend_data,
    }

    return data