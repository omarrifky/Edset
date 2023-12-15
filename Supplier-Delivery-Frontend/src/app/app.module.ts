import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SupplierhomepageComponent } from './pages/supplier/supplierhomepage/supplierhomepage.component';
import { DeliveryhomepageComponent } from './pages/delivery/deliveryhomepage/deliveryhomepage.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SupplierhomepageComponent,
    DeliveryhomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
