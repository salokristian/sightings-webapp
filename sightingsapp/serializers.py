from rest_framework import serializers
from sightingsapp.models import Sighting, Species


class SightingSerializer(serializers.ModelSerializer):
    def validate_species(self, name):  
        """Check that species is in the table of allowed species."""
        accepted_species = Species.objects.values_list('name', flat=True)
        if name not in accepted_species:
            raise serializers.ValidationError(
                'Species {0} is not allowed.'.format(name))
        else:
            return name

    def validate_count(self, count):
        """Check that count is at least 1."""
        if count < 1:
            raise serializers.ValidationError(
                'Count must be at least one, you had {0}.'.format(count))
        else:
            return count
    
    class Meta:
        model = Sighting
        fields = ('dateTime', 'description', 'count', 'species', 'id')


class SpeciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Species
        fields = ('name', )
