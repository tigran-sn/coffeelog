import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { every } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private matSnackBar: MatSnackBar = inject(MatSnackBar);

  title = 'Coffee Log';

  ngOnInit() {
    if (window.matchMedia('display-mode: browser').matches) {
      console.log('This is running in a browser');
      if ('standalone' in navigator) {
        console.log('Only available in Safari');
        this.matSnackBar.open(
          'You can install this app, use Share -> Add to Home Screen',
          '',
          {
            duration: 5000,
          }
        );
      } else {
        console.log('Not in Safari');
        window.addEventListener('beforeinstallprompt', (e) => {
          e.preventDefault();
          console.log('beforeinstallprompt has fired', e);
          const sb = this.matSnackBar.open(
            'You can install this app',
            'Install',
            {
              duration: 5000,
            }
          );
          sb.onAction().subscribe(() => {
            (event as any).prompt();
            (event as any).userChoice.then((result: { outcome: string }) => {
              if (result.outcome === 'dissmised') {
                console.log('User dismissed the A2HS prompt');
              } else {
                console.log('User accepted the A2HS prompt');
              }
            });
          });
        });
      }
    }
  }
}
