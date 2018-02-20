from django.contrib import admin
from sightingsapp.models import Sighting, Species


admin.site.register(Sighting)
admin.site.register(Species)