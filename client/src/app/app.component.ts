import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Media } from './core/models/Media';
import { User } from './core/models/User';
import { AccountService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Rotten Potatoes';
  shows: Media[];

  constructor(private accountService: AccountService) { }
  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() { 
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

}

