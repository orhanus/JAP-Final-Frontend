import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Media } from 'src/app/core/models/Media';
import { AccountService } from 'src/app/core/services/auth.service';
import { ShowsService } from 'src/app/core/services/media.service';

@Component({
  selector: 'app-media-detailed',
  templateUrl: './media-detailed.component.html',
  styleUrls: ['./media-detailed.component.css']
})
export class MediaDetailedComponent implements OnInit {
  media: Media;
  max = 5;
  rate = 1;
  isReadonly = false;
  overStar: number | undefined;

  constructor(private showService: ShowsService, private route: ActivatedRoute,
    private toastr: ToastrService, public accountService: AccountService) { }

  ngOnInit(): void {
    this.loadMedia();
  }
 
 
  hoveringOver(value: number): void {
    this.overStar = value;
  }
 
  resetStar(): void {
    this.overStar = void 0;
  }
  onClick() {
    this.showService.addRating({showId: this.media.id, score: this.overStar*2}).subscribe(response => {
      this.toastr.success("Rating was a success", "Success");
    }, error => {
      console.log(error);
      this.toastr.error(error);
    })
    this.rate = this.media.averageRating;
  }

  loadMedia() {
    this.showService.getMedia(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe(res => {
        this.media = res;
        this.rate = this.media.averageRating/2;
      }, err => {
        this.toastr.error("Media with given id does not exist");
      })
  }



}
