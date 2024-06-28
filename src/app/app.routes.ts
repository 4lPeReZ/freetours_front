import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { AuthGuard } from './guards/auth.guard'; // Importa el AuthGuard

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileViewComponent, canActivate: [AuthGuard] },
  { path: 'profile/edit', component: ProfileEditComponent, canActivate: [AuthGuard] },
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] }
];
