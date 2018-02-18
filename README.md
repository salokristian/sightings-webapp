# Vincit 2018 koodarijahti - tehtävä

## Vaihtoehto A) - Selainsovellus

Toteutin alkuperäisen sovelluksen (portissa 8081) kanssa keskustelevan selainsovelluksen. Sovellus on toteutettu käyttäen Reactia ja Bootstrapia (react-bootstrapin kautta). Sovelluksen ominaisuuksia ovat:

* Havaintojen näyttäminen
* Havaintojen järjestäminen päiväyksen mukaan
* Uusien havaintojen lisääminen ja arvojen tarkistus ennen lähettämistä
* Ilmoitus käyttäjälle, mikäli datan lähettämisessä tai hakemisessa on ongelmia

Sovelluksen toiminta on testattu Win10-ympäristössä Chrome-selaimella. Se toimii hyvin sekä alkuperäisen NodeJS-palvelimen ja palauttamani Django-API:n kanssa. 

Sovelluksen käyttäminen onnistuu seuraavasti:
```
npm install 
npm start
```