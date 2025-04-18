from rest_framework.response import Response
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.metrics.pairwise import cosine_similarity
from .models import PrecomputedArtist

def get_similar_artists(artist_id):
    """
    This API endpoint returns similar artists based on precomputed audio features.
    It assumes that the PrecomputedArtist table (precomputed_artist) is already populated.
    """
    # 1. Load the precomputed data from your table into a Pandas DataFrame.
    qs = PrecomputedArtist.objects.all().values()
    df = pd.DataFrame(list(qs))
    
    # 2. Ensure the necessary feature columns exist.
    feature_cols = ['danceability', 'energy', 'loudness', 'speechiness', 'valence', 'tempo']
    missing_columns = [col for col in feature_cols if col not in df.columns]
    if missing_columns:
        return Response({"error": f"Missing expected columns: {', '.join(missing_columns)}"}, status=500)
    
    # 3. Standardize the features.
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(df[feature_cols])
    
    # 4. Define an internal function to find similar artists.
    def find_similar_artists(artist_id, df, scaled_data, feature_cols, top_n=10):
        # Check if the artist_id exists in the DataFrame.
        if artist_id not in df["artist_id"].values:
            return None
        
        # Find the index of the requested artist.
        idx = df[df["artist_id"] == artist_id].index[0]
        input_vector = scaled_data[idx].reshape(1, -1)
        similarities = cosine_similarity(input_vector, scaled_data)[0]
        
        # Add the similarity column to the DataFrame.
        df = df.copy()
        df["similarity"] = similarities
        
        # Exclude the given artist and sort by similarity in descending order.
        results = df[df["artist_id"] != artist_id].sort_values(by="similarity", ascending=False).head(top_n)
        return results[["artist_id", "similarity"] + feature_cols + ["name", "popularity"]]
    
    # 5. Retrieve similar artists.
    similar_df = find_similar_artists(artist_id, df, scaled_features, feature_cols, top_n=10)
    if similar_df is None or similar_df.empty:
        return Response({"error": "Artist not found or insufficient data for similarity."}, status=404)
    
    # 6. Convert the similarity score into a percentage for easier interpretation.
    results = similar_df.to_dict(orient="records")
    for item in results:
        item["percentage"] = round(item.pop("similarity") * 100, 2)
    
    return results
