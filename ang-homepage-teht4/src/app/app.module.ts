import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { PageComponent } from './page/page.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, PageComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    // valepalvelin; poista tämä, jos otat oikean web-API:n käyttöön
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
