import { Component, OnInit } from '@angular/core';
import { RegService } from '../reg.service';
import { Registration } from '../registration';

@Component({
  selector: 'app-reglist',
  templateUrl: './reglist.component.html',
  styleUrl: './reglist.component.css',
})
export class ReglistComponent implements OnInit {
  regs: Registration[] = [];

  // konstruktorissa määritellään, että pyytää injektiota RegServiceltä
  constructor(private regService: RegService) {}

  ngOnInit(): void {
    this.getRegs();
  }

  getRegs(): void {
    // tilataan (subscribe) observable -> otetaan vastaan observablen välittämä tieto
    this.regService.getRegs().subscribe((regs) => (this.regs = regs));
  }
}
