import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../models/tour.model';

@Component({
  selector: 'app-tour-edit',
  templateUrl: './tour-edit.component.html',
  styleUrls: ['./tour-edit.component.css']
})
export class TourEditComponent implements OnInit {
  editForm!: FormGroup;
  tourId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private tourService: TourService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.tourId = +id;
      this.tourService.getTour(this.tourId).subscribe(
        data => {
          this.editForm = this.formBuilder.group({
            title: [data.title, Validators.required],
            description: [data.description, Validators.required],
            location: [data.location, Validators.required],
            date: [data.date, Validators.required],
            price: [data.price, Validators.required],
            city: [data.city, Validators.required], // Añadir validación para city
            name: [data.name, Validators.required]  // Añadir validación para name
          });
        },
        error => {
          console.error('Error fetching tour details', error);
        }
      );
    } else {
      console.error('Tour ID is null');
    }
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedTour: Tour = {
        id: this.tourId,
        ...this.editForm.value
      };

      this.tourService.updateTour(this.tourId, updatedTour).subscribe(
        data => {
          this.router.navigate(['/tours']);
        },
        error => {
          console.error('Error updating tour', error);
        }
      );
    }
  }
}
