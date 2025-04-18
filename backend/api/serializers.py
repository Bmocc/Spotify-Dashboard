from rest_framework import serializers
from .models import Artists, AudioFeatures 

class ArtistsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artists
        fields = '__all__'

class AudioFeaturesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AudioFeatures
        fields = '__all__'
