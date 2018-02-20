from django.db import models
from django.core.exceptions import ValidationError


class Sighting(models.Model):
    """
    Stores data for a sighting. The ID is added automatically.
    """

    dateTime = models.DateTimeField()
    description = models.TextField()
    count = models.PositiveIntegerField()
    species = models.CharField(max_length=100)


class Species(models.Model):
    """
    Saves the accepted species' names.
    """

    name = models.TextField()

