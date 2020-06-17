import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CheckoutComponent} from './checkout/checkout.component';
import {IndexComponent} from './index/index.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';
import {BrowsecodesComponent} from './browsecodes/browsecodes.component';
import {CartComponent} from './cart/cart.component';
import {PaymentComponent} from './payment/payment.component';

const routes: Routes = [
  {path: '',          component: IndexComponent},
  {path: 'browse',    component: BrowsecodesComponent},
  {path: 'welcome',   component: WelcomeComponent},
  {path: 'signup',    component: SignupComponent},
  {path: 'signin',    component: SigninComponent},
  {path: 'cart',      component: CartComponent},
  {path: 'checkout',  component: CheckoutComponent},
  {path: 'payment',  component: PaymentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }