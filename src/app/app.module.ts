import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { JwtInterceptor } from './services/jwt-interceptor.service';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ProtectedComponent,
    ProfileViewComponent,
    ProfileEditComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true } // Añadir el interceptor aquí
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
