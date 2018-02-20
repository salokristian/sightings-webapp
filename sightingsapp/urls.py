from django.urls import path, re_path
from sightingsapp import views
from django.views.generic import TemplateView


urlpatterns = [
    path('sightings', views.sightings_list, name="get_post_sightings"),
    path('species', views.species_list, name="get_species"),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]