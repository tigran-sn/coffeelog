import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { GeolocationService } from '../geolocation.service';
import { Coffee } from '../logic/Coffee';
import { TastingRating } from '../logic/TastingRating';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UiService } from '../ui.service';

@Component({
  selector: 'app-coffee',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatSlideToggleModule,
    FormsModule,
  ],
  templateUrl: './coffee.component.html',
  styleUrl: './coffee.component.scss',
})
export class CoffeeComponent {
  private geolocationSewrvice: GeolocationService = inject(GeolocationService);
  private data: DataService = inject(DataService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private ui: UiService = inject(UiService);

  coffee: Coffee = new Coffee();
  types = ['Espresso', 'Ristretto', 'Americano', 'Cappuccino', 'Macchiato'];
  tastingEnabled = false;
  formType: 'editing' | 'inserting' = 'inserting';

  ngOnInit() {
    this.ui.setTitle('New');
    this.ui.setThemeColor('#343a40');

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.formType = 'editing';
        this.data.get(params['id'], (coffee: Coffee) => {
          this.coffee = coffee;
          this.formType = 'editing';
          this.ui.setTitle(this.coffee.name);
          if (this.coffee.tastingRating) {
            this.tastingEnabled = true;
          }
        });
      }
    });
  }

  tastingRatingChanged(checked: boolean) {
    if (checked) {
      this.coffee.tastingRating = new TastingRating();
    } else {
      this.coffee.tastingRating = null;
    }
  }

  aquireLocation() {
    this.geolocationSewrvice.requestLocation((location) => {
      if (location) {
        if (this.coffee.location) {
          this.coffee.location.latitude = location.latitude;
          this.coffee.location.longitude = location.longitude;
        }
      } else {
        alert('Location not available');
      }
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }

  save() {
    let resultFunction = (result: boolean) => {
      if (result) {
        this.router.navigate(['/']);
      } else {
        alert('Error saving coffee');
      }
    };

    if (this.formType === 'inserting') {
      let { _id, ...coffeeWithoutId } = this.coffee;
      this.data.save(coffeeWithoutId, resultFunction);
    } else {
      this.data.save(this.coffee, resultFunction);
    }
  }
}
