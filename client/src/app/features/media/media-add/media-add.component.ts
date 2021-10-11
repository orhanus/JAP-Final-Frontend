import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Actor } from 'src/app/core/models/Actor';
import { MediaAdd } from 'src/app/core/models/MediaAdd';
import { ShowsService } from 'src/app/core/services/media.service';

@Component({
  selector: 'app-media-add',
  templateUrl: './media-add.component.html',
  styleUrls: ['./media-add.component.css']
})
export class MediaAddComponent implements OnInit {
  mediaAdd: MediaAdd;
  media: any = {};
  actors: string;

  constructor(private showService: ShowsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.media.type = "Movie";
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

  addMedia(){
    this.mediaAdd = {
      title: this.media.title,
      description: this.media.description,
      type: this.media.type,
      coverImageUrl: this.media.coverImageUrl,
      releaseDate: this.media.releaseDate,
      actors: this.getActorsFromString(this.actors)
    }
    
    this.showService.addMedia(this.mediaAdd)
      .subscribe(res => {
        this.toastr.success("Movie was successfully added");
      }, err => {
        this.toastr.error("Movie couldn't be added");
      })
  }
}
