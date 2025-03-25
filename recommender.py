import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.metrics.pairwise import cosine_similarity
from .models import AudioFeatures  

def get_recommendations(seed_track_id, top_n=10):
    # Step 1: Load all audio features from database
    qs = AudioFeatures.objects.all()
    df = pd.DataFrame.from_records(qs.values())

    # Step 2: Define the features to use
    feature_cols = [
        'acousticness', 'danceability', 'duration', 'energy', 'instrumentalness',
        'key', 'liveness', 'loudness', 'mode', 'speechiness', 'tempo',
        'time_signature', 'valence'
    ]

    # Step 3: Normalize the data
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(df[feature_cols])
    df_scaled = pd.DataFrame(scaled_features, columns=feature_cols)

    # Step 4: Get the index of the seed track
    try:
        seed_index = df[df['id'] == seed_track_id].index[0]
    except IndexError:
        return []  # Track not found

    seed_vector = df_scaled.iloc[seed_index].values.reshape(1, -1)

    # Step 5: Compute similarity
    similarities = cosine_similarity(seed_vector, df_scaled)[0]

    # Step 6: Add similarity to original DataFrame
    df['similarity'] = similarities

    # Step 7: Sort and return top N excluding the seed
    top_matches = (
        df[df['id'] != seed_track_id]
        .sort_values(by='similarity', ascending=False)
        .head(top_n)
    )

    return top_matches[['id', 'similarity']].to_dict(orient='records')
