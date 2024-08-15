import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LaskinService {
  public laskeUusiHinta(hinta: number, prosentti: number) {
    return Number((hinta * (1 + prosentti * 0.01)).toFixed(2));
  }

  public laskeInflaatio(vanhaHinta: number, uusiHinta: number) {
    return ((uusiHinta - vanhaHinta) / vanhaHinta) * 100;
  }
}
