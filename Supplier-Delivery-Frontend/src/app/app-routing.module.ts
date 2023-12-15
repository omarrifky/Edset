import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DeliveryhomepageComponent } from './pages/delivery/deliveryhomepage/deliveryhomepage.component';
import { SupplierhomepageComponent } from './pages/supplier/supplierhomepage/supplierhomepage.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'delivery', component: DeliveryhomepageComponent },
  { path: 'supplier', component: SupplierhomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
