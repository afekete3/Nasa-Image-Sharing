import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateAccountComponent } from './accounts/create-account/create-account.component';
import {CreateAccountService} from './services/create-account.service';
import { LoginComponent } from './accounts/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthDashboardComponent } from './auth-dashboard/auth-dashboard.component'
import { CreateCollectionComponent } from './create-collection/create-collection.component'

 const routes: Routes = [
   { path: 'login', component: LoginComponent },
   { path: 'createaccount', component: CreateAccountComponent },
   { path: 'dashboard', component: CreateAccountComponent },
   { path: 'home', component: HomeComponent},
   { path: 'authdashboard', component: AuthDashboardComponent},
   { path: 'createcollection', component: CreateCollectionComponent},
];

@NgModule({
 imports: [ RouterModule.forRoot(routes) ],
 exports: [ RouterModule ],
 
 
})



export class AppRoutingModule { 
 
}
