import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private matSnackBar: MatSnackBar = inject(MatSnackBar);
  private swUpdate: SwUpdate = inject(SwUpdate);

  title = 'Coffee Log';

  ngOnInit() {
    // Checking for service worker updates
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate();
      this.swUpdate.versionUpdates.subscribe((update) => {
        if (update.type === 'VERSION_READY') {
          const sb = this.matSnackBar.open(
            'There is a new version of the app available.',
            'Install now',
            {
              duration: 4000,
            }
          );
          sb.onAction().subscribe(() => {
            // TODO: UI check before update
            document.location.reload();
          });
        }
      });
    } else {
      console.log('Service worker updates are disabled');
    }

    // Updating the UI on network changes
    this.updateNetworkStatusUi();
    window.addEventListener('online', this.updateNetworkStatusUi);
    window.addEventListener('offline', this.updateNetworkStatusUi);

    // Inviting the user to install the app
    if (window.matchMedia('(display-mode: browser').matches) {
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

  private updateNetworkStatusUi() {
    if (navigator.onLine) {
      document.querySelector('body')?.style.removeProperty('filter');
      this.matSnackBar.dismiss();
    } else {
      this.matSnackBar.open('You are now offline', '', {
        duration: 3000,
      });
      document
        .querySelector('body')
        ?.style.setProperty('filter', 'grayscale(1)');
    }
  }
}
