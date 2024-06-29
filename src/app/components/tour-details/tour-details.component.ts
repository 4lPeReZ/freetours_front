import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../models/tour.model';

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css']
})
export class TourDetailsComponent implements OnInit {
  tour: Tour | null = null;

  constructor(private route: ActivatedRoute, private tourService: TourService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const tourId = +id;
      this.tourService.getTour(tourId).subscribe(
        data => {
          this.tour = data;
        },
        error => {
          console.error('Error fetching tour details', error);
        }
      );
    } else {
      console.error('Tour ID is null');
    }
  }

  deleteTour(id: number): void {
    this.tourService.deleteTour(id).subscribe(
      () => {
        this.router.navigate(['/tours']);
      },
      error => {
        console.error('Error deleting tour', error);
      }
    );
  }
}
