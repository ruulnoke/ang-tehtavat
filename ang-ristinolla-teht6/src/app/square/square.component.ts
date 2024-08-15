import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './square.component.html',
  styleUrl: './square.component.css',
})
export class SquareComponent {
  /* @Input() tarkoittaa että value -propertyn arvo
     tulee syötteenä sisään äitikomponentilta.
     Propertyä turha alustaa (!-merkintä), koska
     arvo tulee aina äitikomponentilta
  */
  @Input()
  value!: string;
  @Input()
  line!: number[];
  @Input()
  index!: number;
}
