import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { CreateAccountComponent } from './accounts/create-account/create-account.component';
import {CreateAccountService} from './create-account.service';
import { LoginComponent } from './accounts/login/login.component';
import { AppRoutingModule } from './/app-routing.module'
import { LoginService } from './login.service'

@NgModule({
  declarations: [
    AppComponent,
    CreateAccountComponent,
    LoginComponent,
    
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [CreateAccountService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
