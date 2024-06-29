import { Component, OnInit } from '@angular/core';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../models/tour.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tours-list',
  templateUrl: './tours-list.component.html',
  styleUrls: ['./tours-list.component.css']
})
export class ToursListComponent implements OnInit {
  tours: Tour[] = [];

  constructor(
    private tourService: TourService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tourService.getTours().subscribe(
      data => {
        this.tours = data;
      },
      error => {
        console.error('Error fetching tours', error);
      }
    );
  }

  goToCreateTour(): void {
    this.router.navigate(['/tours/create']);
  }
}
