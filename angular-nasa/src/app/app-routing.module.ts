import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateAccountComponent } from './accounts/create-account/create-account.component';
import {CreateAccountService} from './create-account.service';
import { LoginComponent } from './accounts/login/login.component';

 const routes: Routes = [
  { path: 'login', component: LoginComponent },
   { path: 'createaccount', component: CreateAccountComponent }
];

@NgModule({
 imports: [ RouterModule.forRoot(routes) ],
 exports: [ RouterModule ],
 
 
})



export class AppRoutingModule { 
 
}
