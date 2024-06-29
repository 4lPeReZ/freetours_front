import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ToursListComponent } from './components/tours-list/tours-list.component';
import { TourDetailsComponent } from './components/tour-details/tour-details.component';
import { TourCreateComponent } from './components/tour-create/tour-create.component';
import { TourEditComponent } from './components/tour-edit/tour-edit.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard'; // Importa el AdminGuard

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileViewComponent, canActivate: [AuthGuard] },
  { path: 'profile/edit', component: ProfileEditComponent, canActivate: [AuthGuard] },
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
  { path: 'tours', component: ToursListComponent },
  { path: 'tours/create', component: TourCreateComponent, canActivate: [AdminGuard] }, // Aplicar el AdminGuard
  { path: 'tours/:id', component: TourDetailsComponent },
  { path: 'tours/edit/:id', component: TourEditComponent, canActivate: [AuthGuard] }
];
