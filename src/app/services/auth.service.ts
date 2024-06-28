import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../components/environments/environment.prod'; // Asegúrate de que la ruta es correcta
import { Router } from '@angular/router';
import { User } from '../models/user.model'; // Importar User

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
    return this.http.post<User>(`${environment.apiUrl}/auth/login`, { username, password })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, user)
      .pipe(map(response => {
        console.log(response); // Aquí puedes ver exactamente qué está devolviendo el servidor
        return response;
      }));
  }  

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']); // Redirigir al login después del logout
  }
  
  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/auth/profile`);
  }
  
  updateUserProfile(user: User): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/auth/profile`, user)
      .pipe(map(updatedUser => {
        // Actualiza el usuario en el local storage si es el usuario actual
        if (this.currentUserValue && this.currentUserValue.id === updatedUser.id) {
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          this.currentUserSubject.next(updatedUser);
        }
        return updatedUser;
      }));
  }
}
