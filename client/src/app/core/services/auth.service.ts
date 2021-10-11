import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if(user) {
          this.setCurrentUser(user);
        }
      })
    )
      
  }

  register(model: any){
    return this.http.post<User>(this.baseUrl + 'account/register', model, {observe: 'response'});
  }

  setCurrentUser(user: User) {
    if(user == null)
      return;
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.clear();
    this.currentUserSource.next(null as User);
  }

  getUserRole(){
    var user = localStorage.getItem('user');
    if(user){
      var token = JSON.parse(localStorage.getItem('user')).token;
      return JSON.parse(atob(token.split('.')[1])).role;
    }

    return null;
  }
}
