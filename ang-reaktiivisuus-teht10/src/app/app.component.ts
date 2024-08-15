/* Angular-client joka käyttää websocket-serviceä
Websocket-serveriltä tuleva datastream on haettu
Angular-templaattiin kahdella eri tavalla.
*/

import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';
// import { Observable } from 'rxjs';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-root',
  template: `<h2>Angular WebSocket</h2>
    <p>
      Tähän piirretään chart.js-kirjaston avulla reaaliaikainen viivadiagrammi
      muuttuvasta lämpötilasta.
    </p>
    <!--DecimalPipe: luku näytetään pyöristettynä kahteen desimaaliin-->
    <h3>{{ realtimedata | number : '1.2-2' }}</h3>
    <!--VAIHTOEHTO: async -pipe mahdollistaa observablen esittämisen 
        templaatissa. async hoitaa siis subscriben homman
    <h3>{{ realtimedata2 | async }}</h3> -->
    <div class="chart-container">
      <canvas id="MyChart">{{ chart }}</canvas>
    </div> `,
})
export class AppComponent implements OnInit {
  realtimedata!: number; // tähän sijoitetaan numerona
  // VAIHTOEHTO: realtimedata2!: Observable<string>; // Haetaan tähän observablena.
  label!: string; // tähän sijoitetaan aika (Date()-metodi palauttaa stringinä)

  public chart: any;

  constructor(private wsService: WebsocketService) {}

  ngOnInit() {
    this.createChart();

    // kaksi tapaa hakea realtimedata

    // Haetaan observable servicestä, tilataan se ja otetaan data
    // ulos observablesta muuttujaan realtimedata
    this.wsService.createSocketObservable().subscribe((data) => {
      // Observablelta saatu data muutetaan numeroksi ja sijoitetaan muuttujaan
      this.realtimedata = parseFloat(data);
      // data lisätään kuvaajaan
      this.addData(this.label, this.realtimedata);
    });

    // VAIHTOEHTO: haetaan observable servicestä ja sijoitetaan se
    // muuttujaan realtimedata2
    // this.realtimedata2 = this.wsService.createSocketObservable();
  }

  addData(label: string, newData: number) {
    this.label = Date();
    this.chart.data.labels.push(label);
    this.chart.data.datasets.forEach((dataset: any) => {
      dataset.data.push(newData);
    });
    this.chart.update();
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'line', // kuvaajan tyyppi: viivadiagrammi

      data: {
        labels: [],
        datasets: [
          {
            label: 'Lämpötila',
            data: [],
            backgroundColor: 'blue',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
