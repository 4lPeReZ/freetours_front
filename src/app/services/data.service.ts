import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../components/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.apiUrl; // Usa la URL del entorno

  constructor(private http: HttpClient) {}

  // Ejemplo de método para obtener datos
  getData(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${endpoint}`);
  }

  // Ejemplo de método para enviar datos
  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${endpoint}`, data);
  }

  // Otros métodos HTTP pueden ser añadidos aquí, como update (PUT) y delete (DELETE)
}