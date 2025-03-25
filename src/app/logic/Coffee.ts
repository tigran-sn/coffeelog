import { PlaceLocation } from './PlaceLocation';
import { TastingRating } from './TastingRating';

export class Coffee {
  type = '';
  rating = 0;
  notes = '';
  tastingRating: TastingRating | null = null;

  constructor(
    public _id: string | null = '',
    public name: string = '',
    public place: string = '',
    public location: PlaceLocation | null = null
  ) {
    this.tastingRating = new TastingRating();
    if (location === null) {
      this.location = new PlaceLocation();
    }
  }
}
