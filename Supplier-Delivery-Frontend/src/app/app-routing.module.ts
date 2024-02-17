import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DeliveryhomepageComponent } from './pages/delivery/deliveryhomepage/deliveryhomepage.component';
import { SupplierhomepageComponent } from './pages/supplier/supplierhomepage/supplierhomepage.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CreateProductComponent } from './pages/supplier/create-product/create-product.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'delivery', component: DeliveryhomepageComponent, canActivate: [AuthGuardService] },
  { path: 'supplier', component: SupplierhomepageComponent, canActivate: [AuthGuardService] },
  { path: 'createproduct', component: CreateProductComponent , canActivate: [AuthGuardService]}]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
