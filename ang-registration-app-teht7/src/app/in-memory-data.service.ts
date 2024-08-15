import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Credential } from './credential'; // tunnarin tyyppi
import { Registration } from './registration'; // ilmoittautumisen tyyppi

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    /* 
    Huomaa että tässä sovelluksessa tehdään vain autentikaation frontend-
    koodia. Turvallista autentikaatiota ei pysty tekemään kokonaan
    frontendissä, vaan se vaatii aina backendin. Mutta koska tämä ei ole
    backend-kurssi, niin tyydymme "feikki-autentikaatioon".
         
    Alla olevat oikeat tunnarit viedään loginform-komponenttiin, jossa niitä verrataan
    käyttäjän antamiin tunnareihin. Oikeissa sovelluksissa näin ei tehdä,
    vaan käyttäjän antamat tunnarit lähetetään lomakkeelta palvelimelle
    ja siellä tutkitaan ovatko ne oikeat, ja asiakaspuolelle lähetetään tieto siitä
    olivatko ne oikeat (true tai false). Jos tieto on true, päästään suojatulle
    sivulle.
    
    Oikeassa tietokannassa oikeat tunnarit eivät ole suoraan näkyvissä kuten tässä,
    vaan ne ovat salakirjoitettuina esim. bcrypt -funktiolla. Normaalisti 
    jokaiselle käyttäjälle on omat tunnarit, mutta tässä on vain yhdet ja samat
    kaikille käyttäjille. 
    
    Edellä mainitut jutut otetaan huomioon, sitten kun teemme oikean palvelinsovelluksen 
    backend-kurssilla
    */
    // oikeat tunnarit, joilla pääsee regformiin
    const creds: Credential[] = [
      { id: 1, username: 'tunnus987', password: 'salasana987' },
      { id: 2, username: 'kissa', password: '123' },
    ];
    // ilmoittautumiset, jotka esitetään reglistissä ja uusia voi luoda regformilla
    const regs: Registration[] = [
      {
        id: 1,
        name: 'Matti Mainio',
        email: 'masa@jamk.fi',
        food: 'Liha',
        sauna: true,
      },
    ];
    return { creds, regs };
  }

  // genId-metodi generoi uudelle ilmoittautuneelle id:n
  genId(regs: Registration[]): number {
    return regs.length > 0 ? Math.max(...regs.map((reg) => reg.id)) + 1 : 1;
  }
}
