import { Injectable } from '@angular/core';
import { PlaceLocation } from './logic/PlaceLocation';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  requestLocation(callback: (location: GeolocationCoordinates | null) => void) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          callback(position.coords);
        },
        (error) => {
          callback(null);
        }
      );
    } else {
      alert('Geolocation not available');
    }
  }

  getMapLink(location: PlaceLocation) {
    let query = '';
    if (location.latitude && location.longitude) {
      query = location.latitude + ',' + location.longitude;
    } else {
      query = `${location.address}, ${location.city}`;
    }
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      return `https://maps.apple.com/?q=${query}`;
    } else {
      return `https://maps.google.com/?q=${query}`;
    }
  }
}
