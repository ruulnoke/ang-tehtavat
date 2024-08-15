import { Component } from '@angular/core';
import { LaskinService } from '../laskin.service';

@Component({
  selector: 'app-laskin',
  templateUrl: './laskin.component.html',
  styleUrls: ['./laskin.component.css'],
})
export class LaskinComponent {
  hinta: number = 0; // TS:ssä tietotyyppi merkitään kaksoispisteen perään
  prosentti: number = 0; // val1 ja val2 -arvot saadaan templaatin lomakkeelta
  tulos: number = 0; // result lasketaan tässä luokassa

  constructor(private laskinService: LaskinService) {}

  laske() {
    this.tulos = this.laskinService.laskeUusiHinta(this.hinta, this.prosentti);
  }
}
