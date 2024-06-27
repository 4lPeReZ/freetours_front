import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../components/environments/environment.prod'; // Asegúrate de que la ruta es correcta
import { Router } from '@angular/router';

// Definir una interfaz para el usuario
interface User {
  id: number;
  username: string;
  email?: string; // email es opcional
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) { // Añadir Router aquí
    const storageItem = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(storageItem ? JSON.parse(storageItem) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }  

  login(username: string, password: string): Observable<User> {
    // Asegúrate de reemplazar `{apiUrl}` con la URL real de tu API
    return this.http.post<User>(`${environment.apiUrl}/auth/login`, { username, password })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  register(user: User): Observable<User> {
    // Asegúrate de reemplazar `{apiUrl}` con la URL real de tu API
    return this.http.post<User>(`${environment.apiUrl}/auth/register`, user)
      .pipe(map(user => {
        return user; // Puedes decidir si guardar o no al usuario en localStorage
      }));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']); // Redirigir al login después del logout
  }
}
