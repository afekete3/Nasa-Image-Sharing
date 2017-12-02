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
import { EditCollectionComponent } from './edit-collection/edit-collection.component'
import { MyCollectionsComponent } from './my-collections/my-collections.component'
import { DashboardComponent } from './dashboard/dashboard.component'
 const routes: Routes = [
   { path: '', component : HomeComponent},
   { path: 'login', component: LoginComponent , canActivate:[LoginGuard]},
   { path: 'createaccount', component: CreateAccountComponent, canActivate:[LoginGuard]},
   { path: 'home', component: HomeComponent},
   { path: 'authdashboard', component: AuthDashboardComponent, canActivate:[AuthGuard]},
   { path: 'createcollection', component: CreateCollectionComponent, canActivate:[AuthGuard]},
   { path: 'editcollection', component: EditCollectionComponent},
   { path: 'mycollections', component: MyCollectionsComponent},
   { path: 'dashboard', component: DashboardComponent},
];

@NgModule({
 imports: [ RouterModule.forRoot(routes) ],
 exports: [ RouterModule ],
 
 
})



export class AppRoutingModule { 
 
}
