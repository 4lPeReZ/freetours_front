import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  editForm!: FormGroup; // Definimos el formulario aquí

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''] // Opcional, solo si el usuario quiere cambiar la contraseña
    });

    this.authService.getUserProfile().subscribe(
      data => {
        this.editForm.patchValue({
          username: data.username,
          email: data.email
        });
      },
      error => {
        console.error('Error fetching user profile', error);
      }
    );
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.authService.updateUserProfile(this.editForm.value).subscribe(
        response => {
          console.log('Perfil actualizado con éxito', response);
          this.router.navigate(['/profile']);
        },
        error => {
          console.error('Error al actualizar el perfil', error);
        }
      );
    }
  }
}
