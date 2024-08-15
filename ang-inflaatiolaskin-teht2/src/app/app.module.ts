import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LaskinComponent } from './laskin/laskin.component';
import { Laskin2Component } from './laskin2/laskin2.component';

@NgModule({
  declarations: [AppComponent, LaskinComponent, Laskin2Component],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
