import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../models/Pagination';
import { Media } from '../models/Media';
import { environment } from 'src/environments/environment';
import { Rating } from '../models/Rating';
import { MediaUpdate } from '../models/MediaUpdate';
import { MediaAdd } from '../models/MediaAdd';
import { Screening } from '../models/Screening';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<Media[]> = new PaginatedResult<Media[]>();

  constructor(private http: HttpClient) { }

  getShows(showType: string, page?: number, itemsPerPage?: number, searchParameters?: string){
    let params = new HttpParams();

    if(page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('searchParams', searchParameters === "" ? null : searchParameters);
    }
    return this.http.get<PaginatedResult<Media[]>>(this.baseUrl + 'media/' + showType, {observe: 'response', params}).pipe(
      map(response => {
        this.paginatedResult.data = response.body.data;
        this.paginatedResult.pagination = response.body.pagination;

        return this.paginatedResult;
      })
    );
  }

  addRating(rating: Rating){
    return this.http.post<Media[]>(`${this.baseUrl}rating/${rating.showId}/rate`, { score: rating.score });
  }

  getMedia(mediaId: number){
    return this.http.get<Media>(`${this.baseUrl}media/id/${mediaId}`);
  }

  updateMedia(media: MediaUpdate){
    return this.http.put(`${this.baseUrl}media/update`, media, {observe: 'response'});
  }
  
  addMedia(media: MediaAdd){
    return this.http.post(`${this.baseUrl}media/add`, media, {observe: 'response'});
  }

  getScreenings(mediaId: number){
    return this.http.get<Screening[]>(`${this.baseUrl}screening/${mediaId}`);
  }

  buyTicket(ticket: any){
    return this.http.post(`${this.baseUrl}ticket/buy`, ticket, {observe: 'response'});
  }
}
