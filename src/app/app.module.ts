import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component'; // Importar HomeComponent
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent  // Declarar HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // Configuración de rutas
    ReactiveFormsModule,  // Añadir ReactiveFormsModule en los imports
    HttpClientModule  // Añadir HttpClientModule en los imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
