import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Media } from 'src/app/core/models/Media';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.css']
})
export class MediaCardComponent implements OnInit {
  @Input() media: Media;
  @Output() showRated = new EventEmitter()

  max = 5;
  rate = 1;
  isReadonly = false;
  overStar: number | undefined;
  constructor() { }

  ngOnInit(): void {
    this.rate = this.media.averageRating/2;
  }
 
 
  hoveringOver(value: number): void {
    this.overStar = value;
  }
 
  resetStar(): void {
    this.overStar = void 0;
  }
  onClick() {
    this.showRated.emit({showId: this.media.id, score: this.overStar*2});
  }
  click() {

  }

}
