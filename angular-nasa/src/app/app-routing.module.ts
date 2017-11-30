import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateAccountComponent } from './accounts/create-account/create-account.component';
import {CreateAccountService} from './services/create-account.service';
import { LoginComponent } from './accounts/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthDashboardComponent } from './auth-dashboard/auth-dashboard.component';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
 const routes: Routes = [
   { path: 'login', component: LoginComponent , canActivate:[LoginGuard]},
   { path: 'createaccount', component: CreateAccountComponent, canActivate:[LoginGuard]},
   { path: 'home', component: HomeComponent},
   { path: 'authdashboard', component: AuthDashboardComponent, canActivate:[AuthGuard]},
   { path: 'createcollection', component: CreateCollectionComponent, canActivate:[AuthGuard]},
];

@NgModule({
 imports: [ RouterModule.forRoot(routes) ],
 exports: [ RouterModule ],
 
 
})



export class AppRoutingModule { 
 
}
