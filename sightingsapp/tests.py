from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import serializers, status
from sightingsapp.serializers import SightingSerializer, SpeciesSerializer
from sightingsapp.models import Sighting, Species
from random import randint
import json


class SightingSerializerTestCase(TestCase):
    def setUp(self):
        Species.objects.create(name='mallard')
        Species.objects.create(name='redhead')
        Species.objects.create(name='gadwall')
        Species.objects.create(name='canvasback')
        Species.objects.create(name='lesser scaup')
        Species.objects.create(name='mallard')
        
    def test_count_validation(self):
        serializer = SightingSerializer()
        valid_count = (1, 40, 10000)
        invalid_count = (0, -32, -10000)
        for count in invalid_count:
            self.assertRaises(
                serializers.ValidationError, serializer.validate_count, count)
        for count in valid_count:
            self.assertEqual(serializer.validate_count(count), count)

    def test_species_validation(self):
        species_queryset = Species.objects.all()
        invalid_species = ('lal', 'failduck', 'mallar', 'redheeead', '', 'rj3')
        serializer = SightingSerializer()
        for species in species_queryset:
            self.assertEqual(serializer.validate_species(species.name), species.name)
        for species in invalid_species:
            self.assertRaises(serializers.ValidationError,
                              serializer.validate_species, species)


class GetSightingsTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        s1 = Sighting(dateTime="2000-10-10T00:00:00Z",
                      description="TestDesc", count=1, species="mallard")
        s2 = Sighting(dateTime="2022-12-10T23:22:00Z", 
                      description="TestDesc", count=10, species="redhead")
        s3 = Sighting(dateTime="1200-10-10T05:20:00Z", 
                      description="T1", count=5555, species="canvasback")
        self.sightings = (s1, s2, s3)

    def test_get_single_sighting(self):
        for sighting in self.sightings:
            sighting.save()
            response = self.client.get(reverse("get_post_sightings"))
            sighting = Sighting.objects.all()
            serializer = SightingSerializer(sighting, many=True)
            self.assertEqual(serializer.data, response.data)
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            sighting.delete()
    
    def test_get_multiple_sightings(self):
        for sighting in self.sightings:
            sighting.save()
        response = self.client.get(reverse("get_post_sightings"))
        sightings = Sighting.objects.all()
        serializer = SightingSerializer(sightings, many=True)
        self.assertEqual(serializer.data, response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)        


class PostSightingTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        s1 = {
            'dateTime': '2000-10-10T00:00:00Z',
            'description': 'TestDesc', 
            'count': 1, 
            'species': 'mallard'
        }
        s2 = {
            "dateTime": "2022-12-10T23:22:00Z", 
            "description": "TestDesc", 
            "count": 10, 
            "species": "redhead"
        }
        s3 = {
            "dateTime": "1200-10-10T05:20:00Z",
            "description": "T1",
            "count": 5555,
            "species": "failspecimen"
        }
        s4 = {
            "dateTime": "1200-10-10T05:20:00Z",
            "description": "T1",
            "count": 0,
            "species": "redhead"
        }        
        self.valid_sightings = (s1, s2)
        self.invalid_sightings = (s3, s4)
        Species.objects.create(name="mallard")
        Species.objects.create(name="redhead")

    def test_post_valid_sighting(self):
        for sighting in self.valid_sightings:
            response = self.client.post(reverse(
                'get_post_sightings'), data=json.dumps(sighting),
                content_type='application/json')
            sightings = Sighting.objects.all().last()
            serializer = SightingSerializer(sightings)
            self.assertEqual(sighting['dateTime'], response.data['dateTime'])
            self.assertEqual(
                sighting['description'], response.data['description'])
            self.assertEqual(sighting['count'], response.data['count'])
            self.assertEqual(sighting['species'], response.data['species'])
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_invalid_sighting(self):
        for sighting in self.invalid_sightings:
            response = self.client.post(reverse(
                'get_post_sightings'), data=json.dumps(sighting),
                content_type='application/json')
            self.assertFalse(Sighting.objects.all().exists())
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class GetSpeciesTestCase(TestCase):
    def setUp(self):
        Species.objects.create(name="duck")
        Species.objects.create(name="three-eyed raven")
        Species.objects.create(name="another bird")
        self.client = Client()

    def test_get_species(self):
        response = self.client.get(reverse('get_species'))
        serializer = SpeciesSerializer(Species.objects.all(), many=True)
        self.assertEqual(serializer.data, response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)