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
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { CreateCollectionService } from './services/create-collection.service'
import { AuthGuard } from './guards/auth.guard'
import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard'
import { EditCollectionComponent } from './edit-collection/edit-collection.component'
import { EditCollectionService } from './services/edit-collection.service';
import { MyCollectionsComponent } from './my-collections/my-collections.component'
import { MyCollectionService } from './services/my-collection.service';
import { DashboardService } from './services/dashboard.service'
import { DashboardComponent } from './dashboard/dashboard.component';
import { UnauthDashboardComponent } from './unauth-dashboard/unauth-dashboard.component';
import { VerifyComponent } from './verify/verify.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { PrivacyComponent } from './privacy/privacy.component';
@NgModule({
  declarations: [
    AppComponent,
    CreateAccountComponent,
    LoginComponent,
    HomeComponent,
    CreateCollectionComponent,
    EditCollectionComponent,
    MyCollectionsComponent,
    DashboardComponent,
    UnauthDashboardComponent,
    VerifyComponent,
    AdminHomeComponent,
    PrivacyComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [CreateAccountService, AdminGuard, LoginService, HomeService, CreateCollectionService, AuthGuard, LoginGuard, EditCollectionService, MyCollectionService, DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
