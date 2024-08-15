/*
Servicen käyttö datan hakemiseen sovellukseen api-rajapintojen kautta
on hyvä käytänne. Datan hakemista suoraan komponenttiin ei suositella.

Angularissa ulkopuoliseen datalähteeseen otetaan yhteys oletuksena 
HttpClient-luokasta luotavalla oliolla. Kyseessä on XHR-olio.
Angularissa voidaan yhtä hyvin käyttää myös fetch()-metodia.
Molemmat tavat hakea tietoa on esitetty alla.
*/
import { HttpClient } from '@angular/common/http'; // http-olio hakee datan
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // data haetaan asynkronisesti observablena
import { Content } from './content';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  apiurl = 'api/content'; // valepalvelimen eli in-memory-web-apin osoite
  // apiurl = 'http://localhost:3000/content'; // oikean palvelimen osoite

  // HttpClient-luokasta syntyy http-olio konstruktorissa
  // Tämä on dependency injection
  constructor(private http: HttpClient) {}

  /* http-olion get-metodi palauttaa observablen.
  Palautettavaan observableen on yhdistetty
  pipellä virheenkäsittely. Yksinkertaistamisen vuoksi 
  on käytetty Observablessa any-tietotyyppiä.
  */
  getContent(): Observable<Content[]> {
    return this.http.get<Content[]>(this.apiurl);
    // virheenkäsittelyn voisi laittaa tähän
  }

  /* Sama homma kuin yllä toteutettuna fetchillä.
  Fetch palauttaa promisen, joka välitetään komponentille.
  Yksinkertaistamisen vuoksi on käytetty Promisessa any-tietotyyppiä.
  Mukana on samantyyppinen virheenkäsittely. Huomaa, että fetch()
  ei toimi in-memory-web-apin kanssa, mutta toimii kun käytetään
  oikeaa serveriä http://localhost:3000/products -osoitteesta.
  */
  getProductByIDFetch(productid: string): Promise<any> {
    return fetch(this.apiurl + '/' + productid).catch((error) => {
      console.error('Tapahtui virhe: ', error);
      return error.message || error;
    });
  }
}
