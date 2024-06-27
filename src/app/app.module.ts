import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component'; // Importar componentes
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent  // Añade aquí todos tus componentes que no son standalone
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // Configuración de rutas
    ReactiveFormsModule  // Añade ReactiveFormsModule en los imports
  ],
  providers: [],
  bootstrap: [AppComponent]  // Angular maneja el bootstrap aquí
})
export class AppModule { }
