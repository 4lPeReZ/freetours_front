import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../components/environments/environment.prod';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) {
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

  register(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/register`, user)
      .pipe(map(user => {
        return user;
      }));
  }

  getUserProfile(): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.currentUserValue?.token}`
    });
    return this.http.get<User>(`${environment.apiUrl}/auth/profile`, { headers });
  }

  updateUserProfile(user: User): Observable<any> {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.currentUserValue?.token}`
    });
    return this.http.put<any>(`${environment.apiUrl}/auth/profile/edit`, user, { headers })
        .pipe(map(response => {
            if (response && response.token) {
                // Update the user details and token in local storage
                const updatedUser = { ...response.user, token: response.token };
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                this.currentUserSubject.next(updatedUser);
            }
            return response;
        }));
}


  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    const currentUser = this.currentUserValue;
    console.log('Current User:', currentUser);
    const isAdmin = currentUser?.roles?.includes('ROLE_ADMIN') ?? false;
    console.log('Is Admin:', isAdmin);
    return isAdmin;
  }  
}
