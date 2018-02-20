# Duck Sightings Web App

The Duck Sightings Web App is a simple app for saving sightings and viewing logs of previous sightings. It consists of a Python/Django backend and a React frontend that are connected with RESTful API calls. The app is based on a programming assignment that was done when applying for a summerjob position. 

The app is deployed in [Heroku](https://sightingsapp.herokuapp.com/).


## Table of contents
* [File Structure](#file-structure)
* [Build Instructions](#build-instructions)
* [Django Backend](#django-backend)
* [React Frontend](#react-frontend)


## File structure
The project consists of the following four main directories:

* public (React public files)
* src (React source files)
* sightings (Django project)
* sightingsapp (Django API app)


## Build instructions
The project can be built as follows:
```
git clone https://github.com/salokristian/sightings-webapp.git
npm install
npm run build
pip install -r requirements.txt
python manage.py runserver
```


## Django Backend
The backend implements a RESTful API with Django Rest Framework. The following API endpoints are defined:

* GET /sightings for returning all sightings
* POST /sightings for adding a new sighting
* GET /species for listing supported species

A sighting has fields:

* ``species`` a string, must be one of the supported species
* ``count`` an integer, must be at least zero
* ``dateTime`` a string in ISO8601 (e.g. 2018-12-30T15:40:00Z)
* ``description`` a string
* ``id`` an integer - a unique identifier added by the server

All sightings must have valid values for fields species, count, dateTime and description. Invalid sightings are not saved to the datebase. 

The backend also has tests for the APIs and custom validators. The test can be run with ``python manage.py test``. 
 


## React Frontend
The React frontend is implemented using the create-react-app template. It also utilizes Bootstrap 3 via react-bootstrap. It is tested to function correctly in an up-to-date 2018 Chrome Browser. The frontend implements the following functionalities:

* Displaying old sightings
* Sorting the sightings according to the date
* Adding new sightings and validating their values
* Informing the user in case of a network error
