from .models import RTrackArtist, Artists, RArtistGenre, Genres, Tracks
from django.db.models import Count

def get_collaborations(artist_id):
    track_ids = RTrackArtist.objects.filter(artist_id=artist_id).values_list('track_id', flat=True)

    collab_artist_ids = RTrackArtist.objects.filter(track_id__in=track_ids)\
                                            .exclude(artist_id=artist_id)\
                                            .values_list('artist_id', flat=True)\
                                            .distinct()

    all_artist_ids = list(set(collab_artist_ids) | {artist_id})
    artist_objs = Artists.objects.filter(id__in=all_artist_ids)

    genre_dict = {}
    artist_genres = RArtistGenre.objects.filter(artist_id__in=all_artist_ids)
    for ag in artist_genres:
        genre_dict.setdefault(ag.artist_id, []).append(ag.genre_id)

    artist_id_to_node_id = {artist.id: i for i, artist in enumerate(artist_objs)}

    nodes = [{
        "id": artist_id_to_node_id[artist.id],
        "artist_id": artist.id,
        "name": artist.name,
        "genre": ", ".join(genre_dict.get(artist.id, [])) or "Unknown"
    } for artist in artist_objs]

    main_node_id = artist_id_to_node_id[artist_id]
    links = []

    for collab_id in collab_artist_ids:
        if collab_id not in artist_id_to_node_id:
            continue

        shared_tracks = (
            RTrackArtist.objects
            .filter(artist_id__in=[artist_id, collab_id])
            .values('track_id')
            .annotate(num_artists=Count('artist_id'))
            .filter(num_artists__gte=2)
            .values_list('track_id', flat=True)
        )

        tracks = Tracks.objects.filter(id__in=shared_tracks)
        track_list = [{
            "id": t.id,
            "name": t.name,
            "duration": t.duration,
            "popularity": t.popularity,
            "explicit": t.explicit,
        } for t in tracks]

        # Only add a link if there is at least one shared track.
        if track_list:
            links.append({
                "source": main_node_id,
                "target": artist_id_to_node_id[collab_id],
                "sharedTracks": track_list
            })


    data = {
        "nodes": nodes,
        "links": links
    }

    return data
