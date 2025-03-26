import { Component, inject } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Coffee } from '../logic/Coffee';
import { DataService } from '../data.service';
import { Router, RouterLink } from '@angular/router';
import { GeolocationService } from '../geolocation.service';
import { UiService } from '../ui.service';

@Component({
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private data: DataService = inject(DataService);
  private router: Router = inject(Router);
  private ui: UiService = inject(UiService);
  private geolocationService: GeolocationService = inject(GeolocationService);

  list: Coffee[] = [];

  ngOnInit() {
    this.data.getList((list: Coffee[]) => {
      this.list = list;
    });
    this.ui.setTitle('Coffee List');
    this.ui.setThemeColor('#343a40');
  }

  goToMap(coffee: Coffee) {
    const mapURL = this.geolocationService.getMapLink(coffee.location!);
    window.open(mapURL, '_blank');
  }

  share(coffee: Coffee) {
    const text = `I had this coffee at ${coffee.place} and for me it's a ${coffee.rating} star coffee.`;
    const info = {
      title: `Great coffee place: ${coffee.name}`,
      text,
      url: window.location.href,
    };

    if ('share' in navigator && navigator.canShare()) {
      navigator.share(info);
    } else {
      alert(`Share: ${text}`);
    }
  }

  goToDetails(coffee: Coffee) {
    this.router.navigate(['/coffee', coffee._id]);
  }
}
