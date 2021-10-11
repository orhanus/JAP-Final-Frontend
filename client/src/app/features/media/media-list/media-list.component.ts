import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/core/models/Pagination';
import { Media } from 'src/app/core/models/Media';
import { ShowsService } from 'src/app/core/services/media.service';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css']
})
export class MediaListComponent implements OnInit {
  shows: Media[] = [];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 10;
  searchParameters: string = "";
  showType: string;
  isSearching: boolean = false;
  beforeSearchShowType: string;


  constructor(private showsService: ShowsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.showType = 'Movie';
    this.loadShows('Movie');
  }

  loadShows(showType: string){
    this.showsService.getShows(showType, this.pageNumber, this.pageSize, this.searchParameters).subscribe(response => {
      if(this.showType === showType)
        this.shows = this.shows.concat(response.data);
      else 
        this.shows = response.data;

      this.pagination = response.pagination;
      this.showType = showType;
    }, error => {
      console.log(error);
      this.toastr.error(error);
    })
  }

  rateShow(rating: any) {
    this.showsService.addRating(rating).subscribe(response => {
      this.toastr.success("Rating was a success", "Success");
    }, error => {
      console.log(error);
      this.toastr.error(error);
    })
  }
  onClick(showType: string)
  {
    this.pageNumber = 1;
    this.loadShows(showType);
  }

  search() {
    this.pageNumber = 1;
    if(this.searchParameters.length === 0){
      this.shows = [];
      this.isSearching = false;
      this.loadShows(this.beforeSearchShowType);
    }
    if(this.searchParameters.length < 2)
      return;

    this.beforeSearchShowType = this.isSearching ? this.beforeSearchShowType : this.showType;
    this.showType = 'all';
    this.isSearching = true;

    this.showsService.getShows('all', this.pageNumber, this.pageSize, this.searchParameters).subscribe(response => {
      this.shows = response.data;
      this.pagination = response.pagination;
    })
    
  }

  viewMore() {
    this.pageNumber++;
    this.loadShows(this.isSearching ? 'all' : this.showType);
  }

}
