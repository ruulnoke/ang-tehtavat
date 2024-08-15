import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Credential } from './credential';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // yhdistetään in-mememory-apiin
  private apiUrl = 'api/creds';
  // säilyttää koko sovelluksen tilaa: onko käyttäjä kirjautunut sisään vai ei
  isLoggedIn: boolean;

  constructor(private http: HttpClient) {
    // aluksi kirjautunut false -> ei päästä suojattuun näkymään
    this.isLoggedIn = false;
  }
  // haetaan tunnukset palvelimelta (tässä simuloidusti valeserveriltä)
  getCreds(): Observable<Credential[]> {
    return this.http.get<Credential[]>(this.apiUrl);
  }
}
