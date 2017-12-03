import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateAccountComponent } from './accounts/create-account/create-account.component';
import {CreateAccountService} from './services/create-account.service';
import { LoginComponent } from './accounts/login/login.component';
import { HomeComponent } from './home/home.component';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';
import { MyCollectionsComponent } from './my-collections/my-collections.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UnauthDashboardComponent } from './unauth-dashboard/unauth-dashboard.component';
import { VerifyComponent } from './verify/verify.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { PrivacyComponent } from './privacy/privacy.component';
 const routes: Routes = [
   { path: '', component : UnauthDashboardComponent, canActivate:[LoginGuard]},
   { path: 'login', component: LoginComponent , canActivate:[LoginGuard]},
   { path: 'createaccount', component: CreateAccountComponent, canActivate:[LoginGuard]},
   { path: 'home', component: UnauthDashboardComponent},
   { path: 'createcollection', component: CreateCollectionComponent, canActivate:[AuthGuard]},
   { path: 'editcollection', component: EditCollectionComponent, canActivate:[AuthGuard]},
   { path: 'mycollections', component: MyCollectionsComponent, canActivate:[AuthGuard]},
   { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
   { path: 'searchimages', component: HomeComponent , canActivate:[AuthGuard]},
   { path: 'verify' , component: VerifyComponent, canActivate:[LoginGuard]},
   { path: 'adminhome', component: AdminHomeComponent, canActivate:[AdminGuard]},
   { path: 'privacy' , component: PrivacyComponent},
];

@NgModule({
 imports: [ RouterModule.forRoot(routes) ],
 exports: [ RouterModule ],
 
 
})



export class AppRoutingModule { 
 
}
