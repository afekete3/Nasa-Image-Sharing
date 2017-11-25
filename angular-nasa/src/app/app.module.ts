import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { CreateAccountComponent } from './accounts/create-account/create-account.component';
import {CreateAccountService} from './create-account.service'


@NgModule({
  declarations: [
    AppComponent,
    CreateAccountComponent,
    
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [CreateAccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
