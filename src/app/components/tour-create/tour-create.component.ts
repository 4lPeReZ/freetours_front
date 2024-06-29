import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../models/tour.model';

@Component({
  selector: 'app-tour-create',
  templateUrl: './tour-create.component.html',
  styleUrls: ['./tour-create.component.css']
})
export class TourCreateComponent implements OnInit {
  createForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private tourService: TourService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      price: ['', Validators.required],
      city: ['', Validators.required], // Añadir validación para city
      name: ['', Validators.required]  // Añadir validación para name
    });
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      const newTour: Tour = this.createForm.value;
      this.tourService.createTour(newTour).subscribe(
        data => {
          this.router.navigate(['/tours']);
        },
        error => {
          console.error('Error creating tour', error);
        }
      );
    }
  }
}
