import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { CreateAccountComponent } from './accounts/create-account/create-account.component';
import {CreateAccountService} from './services/create-account.service';
import { LoginComponent } from './accounts/login/login.component';
import { AppRoutingModule } from './/app-routing.module'
import { LoginService } from './services/login.service';
import { HomeComponent } from './home/home.component'
import { HomeService } from './services/home.service';
import { AuthDashboardComponent } from './auth-dashboard/auth-dashboard.component';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { CreateCollectionService } from './services/create-collection.service'
import { AuthGuard } from './guards/auth.guard'
import { LoginGuard } from './guards/login.guard'
@NgModule({
  declarations: [
    AppComponent,
    CreateAccountComponent,
    LoginComponent,
    HomeComponent,
    AuthDashboardComponent,
    CreateCollectionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [CreateAccountService, LoginService, HomeService, CreateCollectionService, AuthGuard, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
