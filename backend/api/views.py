# from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, Response
from .recommender import get_recommendations


# @api_view(['GET'])
@csrf_exempt
def recommend_tracks(request, track_id):
    if request.method == "GET":
        recommendations = get_recommendations(track_id)

    return JsonResponse({"recommendation": recommendations})
    # return Response(recommendations)
