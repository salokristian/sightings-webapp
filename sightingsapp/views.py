from rest_framework import status
from rest_framework.decorators import api_view, parser_classes, renderer_classes
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from sightingsapp.serializers import SightingSerializer, SpeciesSerializer
from sightingsapp.models import Sighting, Species


@api_view(['POST', 'GET'])
@parser_classes((JSONParser,))
@renderer_classes((JSONRenderer,))
def sightings_list(request):
    """
    List all sightings or create a new one.
    """

    if request.method == 'GET':
        sightings = Sighting.objects.all()
        serializer = SightingSerializer(sightings, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SightingSerializer(data=request.data)
        if (serializer.is_valid()):
            serializer.save()
            return Response(
                data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(
                data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@parser_classes((JSONParser,))
@renderer_classes((JSONRenderer,))
def species_list(request):
    """
    List all accepted species.
    """

    if request.method == 'GET':
        species = Species.objects.all()
        serializer = SpeciesSerializer(species, many=True)
        return Response(serializer.data)