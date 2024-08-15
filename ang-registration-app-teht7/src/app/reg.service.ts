import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registration } from './registration';

@Injectable({
  providedIn: 'root',
})
export class RegService {
  private apiurl = 'api/regs';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // injektoidaan HttpClient post-komentoa varten
  constructor(private http: HttpClient) {}

  // metodi, jolla haetaan ilmoittautumiset palvelimelta
  getRegs(): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.apiurl);
  }

  // lähetetään uusi ilmo palvelimelle
  // samalla palautetaan sama data observablena (tyyppinä Registration) - jos palvelimmella on tehty jokin muutos,
  // esim. lisätty ilmoon generoitu id, data palautuu muokattuna
  postReg(newreg: Registration): Observable<Registration> {
    // url: endpoint url, body: sisältö, HTTP options
    return this.http.post<Registration>(this.apiurl, newreg, this.httpOptions);
  }
}
