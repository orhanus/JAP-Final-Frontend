import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { last } from 'rxjs/operators';
import { Actor } from 'src/app/core/models/Actor';
import { Media } from 'src/app/core/models/Media';
import { MediaUpdate } from 'src/app/core/models/MediaUpdate';
import { ShowsService } from 'src/app/core/services/media.service';

@Component({
  selector: 'app-media-edit',
  templateUrl: './media-edit.component.html',
  styleUrls: ['./media-edit.component.css']
})
export class MediaEditComponent implements OnInit {
  media: Media;
  editForm: FormControl;
  actors: string;

  constructor(private showService: ShowsService, private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadMedia();
  }

  loadMedia() {
    this.showService.getMedia(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe(res => {
        this.media = res;
        this.actors = this.getActorsStringFromResponse(this.media.actors);
        console.log(this.media.releaseDate);
      }, err => {
        this.toastr.error("Media with given id does not exist");
      })
  }

  getActorsStringFromResponse(actors: Actor[]){
    var value: string[] = [];
    for(let i = 0; i < actors.length; i++)
      value.push(actors[i]?.firstname + ' ' + actors[i]?.lastname);
    return value.join(', ');
  }

  getActorsFromString(actorString: string){
    let actors: Actor[] = [];
    let actorsFromString = actorString.split(', ');
    for(let i = 0; i < actorsFromString.length; i++)
      actors.push({
        firstname: actorsFromString[i].split(' ')[0],
        lastname: actorsFromString[i].split(' ')[1]
    })

    return actors;
  }

  updateMedia(){
    let mediaEdit: MediaUpdate = {
      id: this.media.id,
      title: this.media.title,
      description: this.media.description,
      coverImageUrl: this.media.coverImageUrl,
      type: this.media.type,
      actors: this.getActorsFromString(this.actors),
      releaseDate: this.media.releaseDate
    };
  

    this.showService.updateMedia(mediaEdit)
      .subscribe(res => {
        this.toastr.success("Media successfully updated");
      }, err => {
        this.toastr.error("Failed to update media");
      })
  }

}
