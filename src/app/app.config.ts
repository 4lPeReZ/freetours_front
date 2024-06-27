import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfig {
  public apiEndpoint: string = 'https://api.misitio.com/';
  // Otras configuraciones globales
}
