// Funktionaalinen guard, jolla suojataan reitti kirjautumattomilta käyttäjiltä

import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
/*
loginGuard on ns. funktionaalinen guard, joka tuli käyttöön Angularin versiossa 15.
Jos loginGuard palauttaa true, reitti
toimii. Muuten Guard palauttaa reitin loginform-näkymään, jota
ei ole olemassa, joten käyttäjä ohjataan error-näkymään.
*/
export function loginGuard(): boolean {
  // service tai muu luokka voitaisiin ottaa funktiossa käyttöön näin:
  // const authservice = inject(AuthService);
  if (inject(AuthService).isLoggedIn) {
    return true; // päästään reitistä eteenpäin
  } else {
    // siirrytään loginformiin, ja jos sitä ei ole mennään error-sivulle
    inject(Router).navigate(['./loginform']);
    return false;
  }
}
