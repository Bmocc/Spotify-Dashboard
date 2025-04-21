import pandas as pd
from .models import PrecomputedTrack  

def get_recommendations(request):
    slider_features = ["danceability", "energy", "tempo", "valence"]
    
    try:
        slider_ranges = {}
        for feature in slider_features:
            values = request.query_params.getlist(feature)
            if not values or len(values) < 2:
                slider_ranges[feature.strip("[]")] = [0.0, 1.0]
            else:
                slider_ranges[feature.strip("[]")] = [float(values[0]), float(values[1])]
    except ValueError:
        return {"error": "Invalid slider values provided."}
    
    try:
        top_n = int(request.query_params.get("top_n", 10))
    except ValueError:
        top_n = 10

    qs = PrecomputedTrack.objects.all().values()
    df = pd.DataFrame(list(qs))

    if df.empty:
        return []
    
    def filter_tracks_by_ranges(df, ranges, top_n=10):
        df_filtered = df.copy()
        for feature, (min_val, max_val) in ranges.items():
            df_filtered = df_filtered[df_filtered[feature].between(min_val, max_val)]
        df_filtered = df_filtered.dropna(subset=["popularity"])
        return df_filtered.sort_values(by="popularity", ascending=False).head(top_n)
    
    recommended_tracks_df = filter_tracks_by_ranges(df, slider_ranges, top_n=top_n)
    if recommended_tracks_df.empty:
        return []
    
    recommendations = recommended_tracks_df.to_dict(orient="records")
    for rec in recommendations:
        rec["id"] = rec.pop("track_id")
    return recommendations
