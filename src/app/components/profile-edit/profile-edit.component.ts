import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model'; // Importar User

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  editForm!: FormGroup;
  user: User | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe(
      data => {
        this.user = data;
        this.editForm = this.formBuilder.group({
          username: [this.user.username, Validators.required],
          email: [this.user.email, [Validators.required, Validators.email]]
        });
      },
      error => {
        console.error('Error fetching user profile', error);
      }
    );
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedUser: User = {
        ...this.user!,
        ...this.editForm.value
      };

      this.authService.updateUserProfile(updatedUser).subscribe(
        data => {
          console.log('Profile updated successfully', data);
          this.router.navigate(['/profile']);
        },
        error => {
          console.error('Error updating profile', error);
        }
      );
    }
  }
}
