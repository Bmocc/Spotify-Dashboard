# from django.conf import settings
# from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .recommender import get_recommendations
from .serializers import ArtistSerializer
from .models import Artist


# @api_view(['GET'])
@require_http_methods(["GET"])
def recommend_tracks(request, track_id):
    if request.method == "GET":
        recommendations = get_recommendations(track_id)

    return JsonResponse({"recommendation": recommendations})
    # return Response(recommendations)


@require_http_methods(["GET"])
def search_artist(request):
    if request.method == "GET":
        
        query = request.GET.get('name', '')

        if not query:
            return JsonResponse({"error": "Missing 'name' query parameter."}, status=400)

        artists = Artist.objects.filter(name__icontains=query)
        serializer = ArtistSerializer(artists, many=True)
        return JsonResponse(serializer.data)
